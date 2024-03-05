exports.get_validar = (request, response, next) => {
    response.render("validar", {username: request.session.username || ""})
}

exports.post_validar = (request, response, next) => {
    console.log(request.body)
    let pass = "Contraseña " + request.body.pswrd + " ";
  
    pass += "Validar contraseña " + request.body.pswrd_confirm + " ";
  
    pass += "Estado de la contraseña " + request.body.hidden;
  
    filesystem.writeFileSync("Contraseña.txt", pass)
    
    response.redirect("/validar")
}

exports.get_preguntas = (request, response, next) => {
    response.render("preguntas", {username: request.session.username || ""})
}

exports.get_raiz = (request, response, next) => {
    response.render("home", {username: request.session.username || ""})
}