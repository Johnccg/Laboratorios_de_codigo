const { response } = require("express")
const Arma = require("../Model/armas.model")

exports.get_crear = (request, response, next) => {
    response.render("crear", {
        username: request.session.username || "",
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
    })
}

exports.post_crear = (request,response,next)=>{
    //console.log(request.body)
    //console.log(request.file)
    
    const mi_arma = new Arma(
        request.body.nombre,
        request.body.clase,
        request.body.rango,
        request.body.dano,
        request.body.manejo,
        request.file.filename)
        mi_arma.save().then(() => {
            response.setHeader('Set-Cookie', 'A_nombre=' + mi_arma.nombre + "; HttpOnly");
            response.redirect("/armas_lista")
        })
        .catch((error) => {console.log(error)})
}

exports.get_modificar = (request, response, next) => {
    Arma.fetchAll().then(([rows, fieldData]) => {
        response.render("modificar",{
            lista_armas: rows,
            username: request.session.username || "",
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || []
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
        request.file.filename).then(([rows, fieldData]) => {
            //console.log(rows)
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
            username: request.session.username || "",
            permisos: request.session.permisos || []
        })
    })
    .catch((error) => {
        console.log(error)
    }) 
}

exports.get_buscar = (request, response, next) =>{
    Arma.search(request.params.busqueda || '').then(([armas, filedData]) => {
        return response.status(200).json({lista_armas: armas})
    })
    .catch((error) => {
        console.log(error)
    }) 
}