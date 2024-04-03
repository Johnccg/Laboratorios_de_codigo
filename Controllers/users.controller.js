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
        request.flash("Past_login", {
            state: "Usuario o contraseña incorrectos"
        })

        if (usuarios.length == 1){
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
        }else{
            response.redirect("/users/login")
        }
    })
    .catch((error) => {console.log(error)})
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