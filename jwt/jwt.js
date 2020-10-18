'use strict'

const jwt = require('jsonwebtoken')

const generate = (uid) => {
    return new Promise((resolve, reject) => {
        let payload = { uid }
        jwt.sign(payload, process.env.JWT_TOKEN, {
            expiresIn: "1h",
        }, (err, token) => {
            if (err) {
                reject("No se puede generar el JWT")
            } else {
                resolve(token)
            }
        })
    })
}

module.exports = generate