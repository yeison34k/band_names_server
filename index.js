const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', client => {
    client.on('disconnect', () => { 
        console.log("cliente desconectado")
    });

    client.on('menasaje', () => {
        console.log("Mensajessss")
    }); 
});

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath))


server.listen(process.env.PORT, (err) => {
    if (err) throw new Error();
    console.log("Hola mundo")
});