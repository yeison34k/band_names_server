'use strict'
const jwt = require('jsonwebtoken')


const validate = (req, res, next) => {
    let token = req.header("x-token")

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "Token not exist!"
        })          
    }

    try {
        let { uid } = jwt.verify(token, process.env.JWT_TOKEN)
        req.uid =  uid
        next()        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token not valid!"
        })
    }

}

module.exports = validate 