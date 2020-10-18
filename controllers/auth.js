'use strict'
const bcrypt = require('bcryptjs')
const { response } = require('express')
const generate = require('../jwt/jwt')


const User = require('../models/user')

async function newUser(req, res = response) {
    let { email, password } = req.body;
    
    try {
        let exitsUser = await User.findOne({ email }) 
        if(exitsUser){
            return res.status(400).json({
                ok: false,
                msg: 'User already exists!'
            })
        }

        let user  = User(req.body)
        
        //emcryp password
        let salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)

        await user.save(); //save user in data base

        let token = await generate(user.id) //generate JWT

        return res.json({
            ok: true,
            msg: 'User create!',
            user,
            token
        })
    } catch (error) {
        console.log("Error", error)
        return res.status(500).json({
            ok: false,
            msg: "Problemas con el servidor"
        })
    }
}

async function login(req, res = response) {
    let { email, password } = req.body;
    try {
        let userDB = await User.findOne({ email })
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'User not exists!'
            })        
        }

        const verified = bcrypt.compareSync(password, userDB.password )
        if (!verified) {
            return res.status(400).json({
                ok: false,
                msg: 'User not valid!'
            })
        }


        let token = await generate(userDB.id) //generate JWT

        res.json({
            ok: true,
            msg: 'Start application!!!',
            userDB,
            token
        })


    } catch (error) {
        console.log("Error", error)
        return res.status(500).json({
            ok: false,
            msg: "Problemas con el servidor"
        })
    }
    
}

module.exports = {
    newUser, 
    login
}