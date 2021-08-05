//Inicializa as constantes do express
const express = require('express');
const router = express.Router();

//Habilita cors para evitar error de CORS do app
const cors = require('cors');
router.use(cors());

//Inicializa as constantes do express
const uuid = require('uuid');

//Inicializa o obj notas
const banco = require('../banco/index');

//Inicializa o filtro ID para usar com some()
const filtroID = req => notas =>
    notas.id.toString() === req.params.id.toString();

//Habilita enviar JSON obj body
router.use(express.json());

// GET todas notas
router.get('/', cors(), (req, res) => res.json(banco.get()));

// POST cria uma notas
router.post('/', cors(), (req, res) => {
    //gera a ID da nova nota
    const id = uuid.v4();

    //Cria o objeto
    const novaNota = {
        id: id,
        ...req.body,
    };

    //verifica se titulo e descrição estão presentes
    if (!novaNota.titulo || !novaNota.desc) {
        return res
            .status(400)
            .json({msg: 'Favor incluir ambos título e descrição'});
    }

    //Salva e retorna o objeto
    banco.adiciona(novaNota);
    res.json(banco.get());
});

// DELETE Nota
router.delete('/:id', cors(), (req, res) => {
    const notas = banco.get();

    //verifica se existe
    const existe = notas.some(filtroID(req));

    //caso sim salva e retorna o obj
    if (existe) {
        const notasFiltrada = notas.filter(nota => !filtroID(req)(nota));
        banco.salva(notasFiltrada);
        res.json(notasFiltrada);
    } else {
        return res
            .status(400)
            .json({msg: `ERRO ID "${req.params.id}" não existe`});
    }
});

module.exports = router;
