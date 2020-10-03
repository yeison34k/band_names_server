'use strict'

const { io } = require('../index');

const Band = require('../models/band');
const Bands = require('../models/bands');


const bands = new Bands();

bands.addBand(new Band("Asking Alexandria"))
bands.addBand(new Band("No Doubt"))
bands.addBand(new Band("Avenged Sevenfold"))
bands.addBand(new Band("Grateful Dead"))
bands.addBand(new Band("Kings of Leon"))
bands.addBand(new Band("Alice in Chains"))
bands.addBand(new Band("The Script"))


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

    client.on('vote-band', (payload) => {
        bands.voteBand(payload);
        client.emit("active-bands", bands.getBands());
    });

    
    client.emit("active-bands", bands.getBands());
});