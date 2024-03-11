const express = require("express")
const router = express.Router()

const Autenticado = require("../Util/autenticar")

const controller_A = require("../Controllers/Listaarmas.controller")

router.get("/crear", Autenticado, controller_A.get_crear)
router.post("/crear", Autenticado,controller_A.post_crear)
router.get("/modificar", Autenticado, controller_A.get_modificar)
router.post("/modificar", Autenticado, controller_A.post_modificar)
router.get("/:arma_id", Autenticado, controller_A.get_raiz)
router.get("/", Autenticado, controller_A.get_raiz)

module.exports = router