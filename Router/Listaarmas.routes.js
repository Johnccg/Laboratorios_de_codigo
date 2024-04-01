const express = require("express")
const router = express.Router()

const Autenticado = require("../Util/autenticar")
const canView = require('../Util/canView')
const canEdit = require('../Util/canEdit')

const controller_A = require("../Controllers/Listaarmas.controller")

router.get("/crear", Autenticado, canEdit, controller_A.get_crear)
router.post("/crear", Autenticado, canEdit, controller_A.post_crear)
router.get("/modificar", Autenticado, canEdit, controller_A.get_modificar)
router.post("/modificar", Autenticado, canEdit, controller_A.post_modificar)
router.get("/:arma_id", Autenticado, canView, controller_A.get_raiz)
router.get("/", Autenticado, canView, controller_A.get_raiz)

module.exports = router