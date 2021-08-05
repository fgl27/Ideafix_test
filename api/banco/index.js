const fs = require('fs');

//Inicializa o caminho do arquivo e o objeto
const PATH = './banco/notas.json';
let data = JSON.parse(fs.readFileSync(PATH, {encoding: 'utf-8'}) || '[]');

//Inicializa o objeto notas
const notas = {
    get: get,
    adiciona: adiciona,
    salva: salva,
};

//Função adiciona uma nota
function get() {
    data = JSON.parse(fs.readFileSync(PATH, {encoding: 'utf-8'}) || '[]');
    return data;
}

//Função adiciona uma nota
function adiciona(novaNota) {
    data.push(novaNota);
    salva(data);
}

//Função salva notas, usada quando adiciona e remove notas
function salva(updatedata) {
    data = updatedata;
    fs.writeFileSync(PATH, JSON.stringify(data, null, 4));
}

module.exports = notas;
