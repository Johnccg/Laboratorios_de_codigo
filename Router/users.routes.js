const express = require("express")
const router = express.Router()

const controller_U = require("../Controllers/users.controller")

router.get("/login", controller_U.get_login)
router.post("/login", controller_U.post_login)
router.get("/logout", controller_U.get_logout)
module.exports = router