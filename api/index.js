//Inicializa as constantes do express
const express = require('express');
const app = express();
const router = require('./routes/api');

//Inicializa as rotas
app.use('/', router);

//Seta a porta do server
var PORT = process.env.PORT || '5000';

//Inicializa o server
app.listen(PORT, () => console.log(`Server iniciou na porta ${PORT}`));
