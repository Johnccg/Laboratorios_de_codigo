const filesystem = require("fs")

exports.get_validar = (request, response, next) => {
    const past = request.flash("Past")[0]
    response.render("validar", {
        username: request.session.username || "",
        past: past || {pswrd: "", pswrd_confirm: "", state: ""},
        csrfToken: request.csrfToken()
    })
}

exports.post_validar = (request, response, next) => {
    let pass = "Contraseña " + request.body.pswrd + " ";
  
    pass += "Validar contraseña " + request.body.pswrd_confirm + " ";
  
    pass += "Estado de la contraseña " + request.body.hidden;
    filesystem.writeFileSync("Contraseña.txt", pass)

    request.flash("Past", {
        pswrd: request.body.pswrd,
        pswrd_confirm: request.body.pswrd_confirm,
        state: request.body.hidden
    })
    
    response.redirect("/validar")
}

exports.get_preguntas = (request, response, next) => {
    response.render("preguntas", {username: request.session.username || ""})
}

exports.get_raiz = (request, response, next) => {
    response.render("home", {username: request.session.username || ""})
}