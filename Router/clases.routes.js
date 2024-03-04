const express = require("express")
const router = express.Router()
const filesystem = require("fs")

const controller_C = require("../Controllers/clases.controller")

router.get("/validar", controller_C.get_validar)
router.post("/validar", controller_C.post_validar)
router.get("/preguntas", controller_C.get_preguntas)
router.get("/", controller_C.get_raiz)

module.exports = router