const { response } = require('express')
const Message = require('../models/message')

async function getChat(req, res = response) {
    const  myUid = req.uid
    const  messageFrom = req.params.from

    let msm = await Message.find({
        $or: [{ _from: myUid, _to: messageFrom }, { _from: messageFrom, _to: myUid } ]
    })
    .sort({ createdAt: 'desc' })

    res.json({
        ok: true, 
        messages: msm
    })
}

module.exports = {
    getChat
}