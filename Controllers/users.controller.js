const Usuario = require("../Model/usuario.model")
const bcrypt = require("bcryptjs")

exports.get_login = (request, response, next) => {
    response.render("login", {username: request.session.username || "",
    registro: false
})
}

exports.post_login = (request, response, next) => {
    Usuario.fetch(request.body.Username).then(([rows, fieldData]) => {
        if (rows.length == 1){
            const usuario = rows[0]
            bcrypt.compare(request.body.Contrasena,usuario.Contraseña).then((doMatch) => {
                if (doMatch){
                    request.session.username = usuario.Nombre
                    request.session.isLoggedIn = true
                    response.redirect("/")
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
    response.render("login", {
        username: request.session.username || "",
        registro: true
    })
}

exports.post_signup = (request, response, next) => {
    const nuevo_usuario = new Usuario(request.body.Username, request.body.Nombre, request.body.Contrasena)
    nuevo_usuario.save().then(() => {
        response.redirect("/users/login")
    })
    .catch((error) => {console.log(error)})
}