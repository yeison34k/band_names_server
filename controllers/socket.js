const User = require('../models/user')


async function userConnect(uid = '') {
    let user = await User.findByIdAndUpdate(uid, { $set: { online: true } })

    console.log(user)
    return user
}

async function userDesconnect(uid = '') {
    let user = await User.findByIdAndUpdate(uid, { $set: { online: false } })
    return user
}

module.exports = {
    userConnect,
    userDesconnect
}