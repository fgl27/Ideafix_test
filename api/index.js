//Inicializa supporte do arquivo .env usando para process.env
require('dotenv').config();

//Inicializa as constantes do express
const express = require('express');
const app = express();

//Inicializa mongodb
const mongoose = require('mongoose');
var DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/notes';
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Database'));

//Inicializa as rotas
const router = require('./routes/api');
app.use('/', router);

//Seta a porta do server
var PORT = process.env.PORT || '5000';

//Inicializa o server
app.listen(PORT, () => console.log(`Server iniciou na porta ${PORT}`));
