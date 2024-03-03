const html_header = `<!DOCTYPE html>
<html class = "no-js" lang="es">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laboratorios</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/foundation-sites@6.8.1/dist/css/foundation.min.css" crossorigin="anonymous">
    </head>
    <body>
            <header>
                <div class="top-bar" id="responsive-menu">
                    <li><img src="" alt="Imágen aquí"></li>
                    <div class="top-bar-left">
                        <ul class="dropdown menu" data-dropdown-menu>
                            <li><a href="/">Home</a></li>
                            <li><a href="/preguntas">Preguntas</a></li>
                            <li><a href="/validar">Validador de contraseñas</a></li>
                            <li><a href="/armas_lista">Lista de armas</a></li>
                            <li><a href="/armas_lista/crear">Crear arma</a></li>
                        </ul>
                    </div>
                </div>
                <p id = "intro">Juan Carlos calderón García | A01625694 | a01625696@tec.mx</p>
            </header>
            <main class="grid-container">
`

const html_footer = `
        </main>
        <footer>
            <br><br>
            <p>Editado en: <a href="https://code.visualstudio.com/">Visual Studio Code</a></p>
        </footer>
    </body>
</html>
`
const lista_armas =[
    {
        nombre: "Splattershot",
        clase: "Shooter",
        rango: 50,
        daño: 47,
        manejo: 60,
        url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/b/bf/S3_Weapon_Main_Splattershot.png/384px-S3_Weapon_Main_Splattershot.png"
    },
    {
        nombre: "Splat roller",
        clase: "Roller",
        rango: 48,
        daño: 45,
        manejo: 55,
        url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/c/c7/S3_Weapon_Main_Splat_Roller.png/384px-S3_Weapon_Main_Splat_Roller.png"
    },
    {
        nombre: "Splat charger",
        clase: "Charger",
        rango: 88,
        daño: 50,
        manejo: 40,
        url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/4/41/S3_Weapon_Main_Splat_Charger.png/384px-S3_Weapon_Main_Splat_Charger.png"
    },
    {
        nombre: "Slosher",
        clase: "Slosher",
        rango: 58,
        daño: 85,
        manejo: 50,
        url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/4/42/S3_Weapon_Main_Slosher.png/384px-S3_Weapon_Main_Slosher.png"
    },
    {
        nombre: "Heavy Splatling",
        clase: "Splatling",
        rango: 78,
        daño: 38,
        manejo: 55,
        url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/5/5e/S3_Weapon_Main_Heavy_Splatling.png/384px-S3_Weapon_Main_Heavy_Splatling.png"
    }
]

const express = require("express")
const router = express.Router()

router.get("/",(request,response,next) => {
    let count = 0
    
    let html = html_header

    for (let i in lista_armas){

        if(count == 0){
            html += `<div class="grid-x grid-margin-x">`
        }
        count ++
        
        html+= `
        <div class="cell large-3 medium-6 small-6">
            <img class="thumbnail" src="${lista_armas[i].url}">
            <h5>${lista_armas[i].nombre}</h5>
            <p>Clase: ${lista_armas[i].clase}</p>
            <p>Rango: ${lista_armas[i].rango}</p>
            <p>Daño: ${lista_armas[i].daño}</p>
            <p>Manejo: ${lista_armas[i].manejo}</p>
        </div>`

        if(count == 4 || i == lista_armas.length){
            html += "</div>"
            count = 0
        }
    }

    html += html_footer
    response.send(html);
})

router.get("/crear",(request, response, next) => {
    let html = html_header

    html +=`
    <div class="primary callout">
        <h1>Añade un arma</h1>

        <form action="/armas_lista/crear" method="POST">
            <label for="nombre">Nombre: 
                <input id="nombre" name="nombre" type="text">
            </label>
            <label for="clase">Clase: 
                <input id="clase" name="clase" type="text">
            </label>
            <label for="rango">Rango: 
                <input id="rango" name="rango" type="number">
            </label>
            <label for="dano">Daño: 
                <input id="dano" name="dano" type="number">
            </label>
            <label for="manejo">Manejo: 
                <input id="manejo" name="manejo" type="number">
            </label>
            <label for="url">Url de imágen: 
                <input id="url" name="url" type="text">
            </label>
            <button type="submit" class="success button" id="submit" value="Arma">Confirmar</button>
        </form>
    </div>
    `

    html += html_footer
    response.send(html);
})

router.post("/crear",(request,response,next)=>{
    console.log(request.body)
    lista_armas.push({
        nombre: request.body.nombre,
        clase: request.body.clase,
        rango: request.body.rango,
        daño: request.body.dano,
        manejo: request.body.manejo,
        url: request.body.url
    })
    response.redirect("/armas_lista/")
})

module.exports = router