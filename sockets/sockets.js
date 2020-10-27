'use strict'

const { io } = require('../index')

const Band = require('../models/band')
const Bands = require('../models/bands')
const { validateToken } = require('../jwt/jwt')
const {userConnect, userDesconnect, saveMessage } = require('../controllers/socket')

const bands = new Bands();

bands.addBand(new Band("Asking Alexandria"))
bands.addBand(new Band("No Doubt"))
bands.addBand(new Band("Avenged Sevenfold"))
bands.addBand(new Band("Grateful Dead"))
bands.addBand(new Band("Kings of Leon"))
bands.addBand(new Band("Alice in Chains"))
bands.addBand(new Band("The Script"))

/*
io.on('connection', client => {
    client.on('disconnect', () => { 
        console.log("cliente desconectado")
    });

    client.on('mensaje', (payload) => {
        io.emit("mensaje", {admin: "Nuevo MSM"})
    });
    
    client.on('emitir-mensaje', (payload) => {
        client.broadcast.emit("nuevo-mensaje", payload)
    });

    //SEND DATA CLIENT
    client.emit("active-bands", bands.getBands());

    //GET DATA CLIENT
    client.on('vote-band', (payload) => {
        bands.voteBand(payload);
        client.emit("active-bands", bands.getBands());
    });

    client.on('add-band', (payload) => {
        bands.addBand(new Band(payload.name));
        client.emit("active-bands", bands.getBands());
    }); 
});*/

io.on('connection', client => {
    let [valid, uid] = validateToken(client.handshake.headers['x-token']);

    if(!valid) {return client.disconnect(); }  //Valid authenticated

    userConnect(uid)

    client.join(uid)

    //listen client messages
    client.on('personal-message', async (payload) => { 
        await saveMessage(payload)
        io.to(payload.to).emit('personal-message', payload)
    })
    
    client.on('disconnect', () => { 
        userDesconnect(uid)
    });

});