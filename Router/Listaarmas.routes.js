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
    response.render("lista_armas",{lista_armas: lista_armas}) //Envía variable a la página tropas
})

router.get("/crear",(request, response, next) => {
    response.render("crear")
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