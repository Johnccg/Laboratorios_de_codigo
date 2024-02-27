const html_header = `<!DOCTYPE html>
<html class = "no-js" lang="es">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laboratorios</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/foundation-sites@6.8.1/dist/css/foundation.min.css" crossorigin="anonymous">
    </head>
    <body class="grid-container">
`

const html_footer = `</body>
</html>
`

const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")

router.use((request, response, next) => {
    console.log('Middleware!');
    next(); //Le permite a la petición avanzar hacia el siguiente middleware
});

router.use("/crear",(request, response, next) => {
    //Página de crear
})

router.use((request, response, next) => {
    response.status(404)
    let html = html_header
    html += `<h2>Lista de armas</h2>`
    html += html_footer
    response.send(html); //Manda la respuesta
});

router.post("/crear",(request,response,next)=>{
    console.log(request.body)
})

router.get("/",(request, response, next) => {
    let html = html_header
    html += `<h2>Página principal</h2>`
    html += html_footer
    response.send(html); //Manda la respuesta
})

module.exports = router