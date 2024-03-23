//la conexion de la base de datos

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {

})
    .then(db => console.log('Base de datos conectada'))
    .catch(err => console.log(err));