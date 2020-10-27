'use strict'
const { response } = require('express')
const User = require('../models/user')


async function getAllUser(req, res = response) {
    let uid = req.uid
    let start = Number(req.query.start) || 0
    
    console.log("uid", uid)
    let users = await User
        .find({ _id: { $ne: uid } })
        .sort('-online')
        .skip(start)
        .limit(20)

    res.json({
        ok: true,
        users,
        msg: "get all users!!"
    })
}

module.exports = {
    getAllUser,
}