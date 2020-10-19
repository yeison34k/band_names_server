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
        
        let salt = bcrypt.genSaltSync() //emcryp password
        user.password = bcrypt.hashSync(password, salt) //emcryp password

        await user.save() //save user in data base

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
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'User not exists!'
            })        
        }

        const verified = bcrypt.compareSync(password, user.password )
        if (!verified) {
            return res.status(400).json({
                ok: false,
                msg: 'User not valid!'
            })
        }

        let token = await generate(user.id) //generate JWT

        res.json({
            ok: true,
            msg: 'Start application!!!',
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

async function newToken(req, res = response) {
    let uid = req.uid
    let token = await generate(uid)
    let user = await User.findById(uid)

    res.json({
        ok: true,
        token,
        user,
        msg: "New token generate!!"
    })
}

module.exports = {
    newUser, 
    login,
    newToken
}