//Inicializa as constantes do express
const express = require('express');
const router = express.Router();

//Enable cors support
const cors = require('cors');
router.use(cors());

//Inicialize db obj
const Note = require('../db/index');

//Enable JSON obj for body
router.use(express.json());

// GET all notes
router.get('/', cors(), async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({msg: err.message});
    }
});

// POST create notes
router.post('/', cors(), async (req, res) => {
    const nova_note = new Note({
        title: req.body.title,
        description: req.body.description,
    });
    try {
        await nova_note.save();
        const notes = await Note.find();
        res.status(201).json(notes);
    } catch (err) {
        res.status(400).json({msg: err.message});
    }
});

// DELETE Note
router.delete('/:id', cors(), getNote, async (req, res) => {
    try {
        await res.note.remove();
        const notes = await Note.find();
        res.status(201).json(notes);
    } catch (err) {
        res.status(500).json({msg: err.message});
    }
});

// Update Note
router.patch('/:id', cors(), getNote, async (req, res) => {
    if (req.body.title != null) {
        res.note.title = req.body.title;
    }
    if (req.body.description != null) {
        res.note.description = req.body.description;
    }
    try {
        const updatedNote = await res.note.save();
        res.status(202).json(updatedNote);
    } catch (err) {
        res.status(400).json({msg: err.message});
    }
});

async function getNote(req, res, next) {
    let note;
    try {
        note = await Note.findById(req.params.id);
        if (note == null) {
            return res
                .status(404)
                .json({msg: `ERRO ID "${req.params.id}" não existe`});
        }
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }

    res.note = note;
    next();
}

module.exports = router;
