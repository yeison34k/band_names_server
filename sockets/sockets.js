const { io } = require('../index')

io.on('connection', client => {
    client.on('disconnect', () => { 
        console.log("cliente desconectado")
    });

    client.on('mensaje', (payload) => {
        io.emit("mensaje", {admin: "Nuevo MSM"})
    }); 
});