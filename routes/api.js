const express = require('express');
const notaController = require('../controllers/notas.js');
const db = require('../models/db.js');

const rota = express.Router();
rota.post('/notas', notaController.salvaNota);
rota.put('/notas/:notaId', notaController.atualizaNota);
rota.delete('/notas/:notaId', notaController.deletaNota);

module.exports = rota;
