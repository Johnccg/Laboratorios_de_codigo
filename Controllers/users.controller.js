const Usuario = require("../Model/usuario.model")
const bcrypt = require("bcryptjs")

exports.get_login = (request, response, next) => {
    const past = request.flash("Past_login")[0]
    response.render("login", {
        username: request.session.username || "",
        registro: false,
        past: past || {username: "", state: ""},
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || []
    })
}

exports.post_login = (request, response, next) => {
    Usuario.fetch(request.body.Username).then(([usuarios, fieldData]) => {
        
        const token = request.body['g-recaptcha-response']
        const secret = "6Lf1HbYpAAAAAIArFrAcEpAplZvJychrx6QCvBRW"
        let success
        
        fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
            {
                method: "POST"
            }).then(result => {
                //console.log(result)
                return result.json()
            }).then(data => {
                //console.log(data)
                success = data.success
                
                if (usuarios.length != 1 ){
                    request.flash("Past_login", {
                        state: "Usuario o contraseña incorrectos"
                    })
                    response.redirect("/users/login")
                }else if (!success){
                    request.flash("Past_login", {
                        state: "Responde el Captcha"
                    })
                    response.redirect("/users/login")
                }else{
                    const usuario = usuarios[0]
                    bcrypt.compare(request.body.Contrasena,usuario.Contraseña).then((doMatch) => {
                        if (doMatch){
                            Usuario.getPermisos(usuario.Username).then(([permisos, fieldData]) => {
                                //console.log(permisos);
                                
                                request.session.permisos = permisos;
                                request.session.username = usuario.Nombre
                                request.session.isLoggedIn = true
                                response.redirect("/")
                            })
                            .catch((error) => {console.log(error)})
                        }else{
                            response.redirect("/users/login")
                        }
                    })
                    .catch((error) => {console.log(error)})
                }
            }).catch((error) => {console.log(error)})
    }).catch((error) => {console.log(error)})
}

exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect("/users/login")
    })
}

exports.get_signup = (request, response, next) => {
    const past = request.flash("Past_login")[0]
    
    response.render("login", {
        username: request.session.username || "",
        registro: true,
        past: past || {username: "", state: ""},
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || []
    })
}

exports.post_signup = (request, response, next) => {
    const nuevo_usuario = new Usuario(request.body.Username, request.body.Nombre, request.body.Contrasena)
    nuevo_usuario.save().then(() => {
        response.redirect("/users/login")
    })
    .catch((error) => {
        console.log(error)
        request.flash("Past_login", {
            state: "Nombre de usuario no disponible",
        })
        response.redirect("/users/signup")
    })
}