const express = require("express")
const router = express.Router()

const controller_U = require("../Controllers/users.controller")

router.get("/login", controller_U.get_login)
router.post("/login", controller_U.post_login)
router.get("/logout", controller_U.get_logout)
router.get("/signup", controller_U.get_signup)
router.post("/signup", controller_U.post_signup)
module.exports = router