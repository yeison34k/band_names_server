'use strict'

const { Router } = require('express')
const { getAllUser } = require('../controllers/users')
const validate = require('../middelwares/validate-jwt')
const router = Router()


router.get("/getAllUsers", validate, getAllUser)

module.exports = router;  