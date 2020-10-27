const User = require('../models/user')
const Message = require('../models/message')


async function userConnect(uid = '') {
    let user = await User.findByIdAndUpdate(uid, { $set: { online: true } })

    console.log(user)
    return user
}

async function userDesconnect(uid = '') {
    let user = await User.findByIdAndUpdate(uid, { $set: { online: false } })
    return user
}


async function saveMessage(payload) {
    
    try {
        let msg = {
            "_from": payload.from,
            "_to": payload.to,
            "message": payload.message
        }

        let message = await Message(msg)
        message.save()
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = {
    userConnect,
    userDesconnect,
    saveMessage
}