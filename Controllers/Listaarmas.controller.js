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
        mi_arma.save().then(([rows, fieldData]) => {
            response.setHeader('Set-Cookie', 'A_nombre=' + mi_arma.nombre + "; HttpOnly");
            response.redirect("/armas_lista")
        })
        .catch((error) => {console.log(error)})
}

exports.get_modificar = (request, response, next) => {
    Arma.fetchAll().then(([rows, fieldData]) => {
        response.render("modificar",{
            lista_armas: rows,
            username: request.session.username || ""
        })
    })
    
    .catch((error) => {
        console.log(error)
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
        request.body.url).then(([rows, fieldData]) => {
            console.log(rows)
            response.redirect("/armas_lista")
        })
        .catch((error) => {
            console.log(error)
        }) 
}

exports.get_raiz = (request,response,next) => {
    //console.log(request.cookies)
    //console.log(request.params.arma_id)
    Arma.fetch(request.params.arma_id).then(([rows, filedData]) => {
        response.render("lista_armas",{
            lista_armas: rows,
            username: request.session.username || ""
        })
    })
    .catch((error) => {
        console.log(error)
    }) 
}