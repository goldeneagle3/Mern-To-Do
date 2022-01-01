const express = require('express')

const authCtrl = require('./../controllers/auth.controller.js')


const router = express.Router()

router.route("/register").post(authCtrl.register)

router.route("/login").post(authCtrl.login)


module.exports = router