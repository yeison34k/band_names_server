'use strict'

const { Router } = require('express')
const { check } = require('express-validator')
const { newUser, login, newToken } = require('../controllers/auth')
const valdateFiels = require('../middelwares/validate-fields')
const validate = require('../middelwares/validate-jwt')
const router = Router()

router.post('/new', [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El E-mail es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    valdateFiels
], newUser)


router.post('/', [
    check("email", "El E-mail es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    valdateFiels
], login)

router.get("/newToken", validate, newToken)

module.exports = router;  