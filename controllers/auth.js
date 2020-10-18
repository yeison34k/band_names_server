'use strict'
const bcrypt = require('bcryptjs')
const { response } = require('express')
const { validationResult } = require('express-validator')


const User = require('../models/user')

async function newUser(req, res = response) {
    let { email, password } = req.body;
    
    try {
        let exitsUser = await User.findOne({ email }) 
        if(exitsUser){
            res.status(400).json({
                ok: false,
                msg: 'User already exists!'
            })
        }

        let user  = User(req.body)
        
        //emcryp password
        let salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)

        await user.save(); //save user in data base
        res.json({
            ok: true,
            msg: 'User create!',
            user
        })
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({
            ok: false,
            msg: "Problemas con el servidor"
        })
    }
}

module.exports = {
    newUser
}