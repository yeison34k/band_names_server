'use strict'

const {Schema, model} = require("mongoose")

const user = Schema({
    nombre: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    online: {
        type: Boolean,
        default: false,
    }
})

user.method('toJSON', function () {
    let { __v, _id, password, ...object } = this.toObject()
    object.uid = _id
    return object
})

module.exports = model('User', user)