const express = require("express")
const router = express.Router()

const Autenticado = require("../Util/autenticar")

const controller_C = require("../Controllers/clases.controller")

router.get("/validar", Autenticado, controller_C.get_validar)
router.post("/validar", Autenticado, controller_C.post_validar)
router.get("/preguntas", Autenticado, controller_C.get_preguntas)
router.get("/", Autenticado, controller_C.get_raiz)

module.exports = router