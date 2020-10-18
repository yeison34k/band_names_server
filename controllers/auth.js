'use strict'
const { response } = require('express');
const { validationResult } = require('express-validator');

function newUser(req, res = response) {
    res.json({
        ok: true,
        msg: 'create new user'
    })
}

module.exports = {
    newUser
}