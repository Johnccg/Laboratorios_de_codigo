const Arma = require("../Model/armas.model")

exports.get_crear = (request, response, next) => {
    response.render("crear", {username: request.session.username || ""})
}

exports.post_crear = (request,response,next)=>{
    const mi_arma = new Arma(
        request.body.nombre,
        request.body.clase,
        request.body.rango,
        request.body.dano,
        request.body.manejo,
        request.body.url)
        mi_arma.save()
        response.setHeader('Set-Cookie', 'ultima_arma=' + mi_arma.nombre + "; HttpOnly");
    response.redirect("/armas_lista")
}

exports.get_raiz = (request,response,next) => {
    console.log(request.cookies)
    response.render("lista_armas",{
        lista_armas: Arma.fetchAll(),
        username: request.session.username || ""
    })
}

exports.get_modificar = (request, response, next) => {
    response.render("modificar",{
        lista_armas: Arma.fetchAll(),
        username: request.session.username || ""
    })
}

exports.post_modificar = (request,response,next)=>{
    Arma.assign(
        request.body.ID,
        request.body.nombre,
        request.body.clase,
        request.body.rango,
        request.body.dano,
        request.body.manejo,
        request.body.url)
    response.redirect("/armas_lista")
}