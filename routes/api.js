const express = require('express');
const notaController = require('../controllers/notas.js');
const eventoController = require('../controllers/eventos.js');

const rota = express.Router();
rota.post('/notas', notaController.criaNota);
rota.put('/notas/:notaId', notaController.atualizaNota);
rota.delete('/notas/:notaId', notaController.deletaNota);

rota.post('/eventos', eventoController.criaEvento);
rota.put('/eventos/:eventoId', eventoController.atualizaEvento);
rota.delete('/eventos/:eventoId', eventoController.deletaEvento);

module.exports = rota;
