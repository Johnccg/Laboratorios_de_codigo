module.exports = (request, response, next) => {
    let canView =  false;
    for (let permiso of request.session.permisos) {
        if (permiso.Nombre == 'Editar Lista') {
            canView = true;
        }
    }

    if(canView) {
        next();
    } else {
        return response.redirect("/");
    }
}