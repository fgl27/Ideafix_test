//Inicializa as constantes do express
const express = require('express');
const router = express.Router();
const cors = require('cors');

//Inicializa as constantes do express
const uuid = require('uuid');

//Inicializa o obj notas
const objNotas = require('../notas/index');
const notas = objNotas.lista;

//Inicializa o filtro ID para usar com some()
const filtroID = req => notas => notas.id.toString() === req.params.id.toString();

router.use(cors());

//Habilita enviar JSON obj body
router.use(express.json());

// GET todas notas
router.get('/', cors(), (req, res) => res.json(notas));

// POST cria uma notas
router.post('/', cors(), (req, res) => {
    //gera a ID da nova nota
    const id = uuid.v4();

    console.log(req.body)

    //Cria o objeto
    const novaNota = {
        id: id,
        ...req.body
    };

    //verifica se titulo e descrição estão presentes
    if (!novaNota.titulo || !novaNota.desc) {
        return res.status(400).json({msg: 'Favor incluir ambos título e descrição'});
    }

    //Salva e retorna o objeto
    objNotas.adiciona(novaNota);
    res.json(notas);
});

// DELETE Nota
router.delete('/:id', cors(), (req, res) => {

    //verifica se existe
    const existe = notas.some(filtroID(req));

    //caso sim salva e retorna o obj
    if (existe) {
        const notasSalva = notas.filter(nota => !filtroID(req)(nota));
        objNotas.salva(notasSalva);
        res.json(notasSalva);
    } else {
        return res.status(400).json({msg: `ERRO ID "${req.params.id}" não existe`});
    }

});

module.exports = router;