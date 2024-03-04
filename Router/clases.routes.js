const express = require("express")
const router = express.Router()
const filesystem = require("fs")

router.get("/validar", (request, response, next) => {
    response.render("validar")
})

router.post("/validar", (request, response, next) => {
    console.log(request.body)
    let pass = "Contraseña " + request.body.pswrd + " ";
  
    pass += "Validar contraseña " + request.body.pswrd_confirm + " ";
  
    pass += "Estado de la contraseña " + request.body.hidden;
  
    filesystem.writeFileSync("Contraseña.txt", pass)
    
    response.redirect("/validar")
})

router.get("/preguntas",(request, response, next) => {
    response.render("preguntas")
})

router.get("/",(request, response, next) => {
    response.render("home")
})

module.exports = router