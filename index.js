const express = require('express')
const path = require('path')
require('dotenv').config()

require('./data_base/config').dataConfig()

const app = express()
app.use(express.json())

const server = require('http').createServer(app)
module.exports.io = require('socket.io')(server)
require("./sockets/sockets");

const publicPath = path.resolve(__dirname, 'public')
app.use(express.static(publicPath))

//my routes
app.use('/api/login', require('./routes/auth'))
app.use('/api/user', require('./routes/users'))
app.use('/api/chat', require('./routes/chat'))

server.listen(process.env.PORT, (err) => {
    if (err) throw new Error();
    console.log("Hola mundo")
});