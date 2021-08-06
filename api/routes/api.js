//Inicializa as constantes do express
const express = require('express');
const router = express.Router();

//Habilita cors para evitar error de CORS do app
const cors = require('cors');
router.use(cors());

//Inicializa o obj notas
const Nota = require('../banco/index');

//Habilita enviar JSON obj body
router.use(express.json());

// GET todas notas
router.get('/', cors(), async (req, res) => {
    try {
        const notas = await Nota.find();
        res.json(notas);
    } catch (err) {
        res.status(500).json({msg: err.message});
    }
});

// POST cria uma notas
router.post('/', cors(), async (req, res) => {
    const nova_nota = new Nota({
        titulo: req.body.titulo,
        desc: req.body.desc,
    });
    try {
        await nova_nota.save();
        const notas = await Nota.find();
        res.status(201).json(notas);
    } catch (err) {
        res.status(400).json({msg: err.message});
    }
});

// DELETE Nota
router.delete('/:id', cors(), getNota, async (req, res) => {
    try {
        await res.nota.remove();
        const notas = await Nota.find();
        res.status(201).json(notas);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

async function getNota(req, res, next) {
    let nota;
    try {
        nota = await Nota.findById(req.params.id);
        if (nota == null) {
            return res
                .status(404)
                .json({msg: `ERRO ID "${req.params.id}" não existe`});
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }

    res.nota = nota;
    next();
}

module.exports = router;
