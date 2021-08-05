const fs = require('fs');

//Inicializa o caminho do arquivo e o objeto
const PATH = './notas/notas.json';
const data = JSON.parse(fs.readFileSync(PATH, {encoding: 'utf-8'}) || '[]');

//Inicializa o objeto notas
const notas = {
    lista: data,
    adiciona: adiciona,
    salva: salva,
};

//Função adiciona uma nota
function adiciona(novaNota) {
    data.push(novaNota);
    salva(data);
}

//Função salva notas, usada quando adiciona e remove notas
function salva(data) {
    fs.writeFileSync(PATH, JSON.stringify(data, null, 4));
}

module.exports = notas;
