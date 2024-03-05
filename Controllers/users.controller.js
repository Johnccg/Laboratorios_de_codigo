const { request, response } = require("express")

exports.get_login = (request, response, next) => {
    response.render("login", {username: request.session.username || ""})
}

exports.post_login = (request, response, next) => {
    request.session.username = request.body.Username
    response.redirect("/")
}

exports.get_logout = (request, response, next) => {
    response.redirect("/users/login")
}