const mongoose = require('mongoose');

const dataConfig  = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB Online')
    } catch (error) {
        console.log("Error", error);
        throw new Error("Error en base de datos.");
    }
}

module.exports = {
    dataConfig
}