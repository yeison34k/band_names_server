'use strict'

const { Router, response } = require('express');
const { check } = require('express-validator');
const { newUser } = require('../controllers/auth');
const valdateFiels = require('../middelwares/validate-fields');
const router = Router()

router.post('/new', [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El E-mail es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    valdateFiels
], newUser);



module.exports = router;  