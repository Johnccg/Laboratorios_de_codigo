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
const app = express()
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: false}));

const rutasClases = require("../Router/clases.routes.js")

app.use("/", rutasClases)

app.listen(1000)


/*
const filesystem = require("fs")

console.log("Hola")

filesystem.writeFileSync("Hola.txt", "Hola desde node")

const http = require("http")

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

const armas = [
    {
        arma: "Splattershot",
        alcance: "medio",
        vel_disparo: "Rápida"
    },
    {
        arma: "Inkbrusk",
        alcance: "Corto",
        vel_disparo: "Rápida"
    }
]

const servidor = http.createServer((request,response) => {
    if (request.url == "/"){
        console.log(request.url)
        response.setHeader("Content-Type","text/html")
        response.write(html_header)
        response.write(`<h2>Lista de armas</h2>`)
        response.write(html_footer)
        response.end()
        
    }else if(request.url == "/crear"){
            response.setHeader("Content-Type","text/html")
            response.write(html_header)
            response.write(`<h2>Crear una nueva arma</h2>
            <form acion = "/crear" method = "POST">
            <label>Nombre del arma
            <input type = "text" id = "Arma" name = "Arma">
            </label>
            
            <label>Rango del arma
            <input type = "text" id = "Alcance" name = "Alcance"> 
            </label>
            
            <label>Velocidad de disparo
            <input type = "text" id = "Vel_disp" name = "Vel_disp">
            </label>
                    
            <input type="submit" class="button" value="Submit">
            </form>
            `)
            response.write(html_footer)  
            response.end()
    }else{
            response.statusCode = 404
            response.setHeader("Content-Type","text/html")
            response.write("404 La página no existe")
            response.end()
    }
})

servidor.listen(3000)
*/