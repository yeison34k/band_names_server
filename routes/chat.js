'use strict'

const { Router } = require('express')
const { getChat } = require('../controllers/messages')
const validate = require('../middelwares/validate-jwt')
const router = Router()


router.get("/getChat/:from", validate, getChat)

module.exports = router;  