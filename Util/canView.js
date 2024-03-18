module.exports = (request, response, next) => {
    let canView =  false;
    for (let permiso of request.session.permisos) {
        if (permiso.Nombre == 'ver_clan') {
            canView = true;
        }
    }

    if(canView) {
        next();
    } else {
        return response.redirect("/");
    }
}