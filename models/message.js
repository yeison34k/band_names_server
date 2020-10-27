'use strict'

const {Schema, model} = require("mongoose")

const message = Schema({
    _from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    _to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    message: {
        type: String,
        require: true,
    }
}, { timestamps: true })

message.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    return object;
})

module.exports = model('Message', message)