const express = require("express")
const router = express.Router()

const controller_A = require("../Controllers/Listaarmas.controller")

router.get("/crear", controller_A.get_crear)
router.post("/crear",controller_A.post_crear)
router.get("/modificar", controller_A.get_modificar)
router.post("/modificar",controller_A.post_modificar)
router.get("/", controller_A.get_raiz)

module.exports = router