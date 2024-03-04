const Arma = require("../Model/armas.model")

exports.get_crear = (request, response, next) => {
    response.render("crear")
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
    response.redirect("/armas_lista")
}

exports.get_raiz = (request,response,next) => {
    response.render("lista_armas",{lista_armas: Arma.fetchAll()})
}

exports.get_modificar = (request, response, next) => {
    response.render("modificar",{lista_armas: Arma.fetchAll()})
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