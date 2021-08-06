const mongoose = require('mongoose');

const notaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('nota', notaSchema);
