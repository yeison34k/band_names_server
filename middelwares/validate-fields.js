const { validationResult } = require("express-validator")

const valdateFiels = (req, res, next) => {
    let errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }
    
    next()
}

module.exports = valdateFiels