const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app)
const io = require('socket.io')(server)

mongoose.connect('mongodb+srv://meumongodb:minhasenha@cluster0-euas3.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

app.use((req, res, next ) => {
    req.io = io;

    next();
})

app.use(cors());  //liberar acesso externo  

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized' )));

app.use(require('./routes'));  // teste

server.listen(3333);