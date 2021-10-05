'use strict'
const mongoose = require('mongoose')
const app = require('./app');
const userControler = require('./src/controllers/user.controller');



mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/bibliotecaDigital', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Conexion:Correcto');
    userControler.mainStart();

    app.listen(3000, function () {

        console.log('Servidor: Conectado')

    })
}).catch(err => console.log(err))