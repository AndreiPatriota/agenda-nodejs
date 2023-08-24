const express = require('express');
const db = require('../models/db.js');
const notasController = require('../controllers/notas.js');
const eventosController = require('../controllers/eventos.js');

rota = express.Router();

rota.get('/', (req, res) => {
  res.render('index');
});

rota.get('/home', (req, res) => {
  res.render('home');
});

rota.get('/notas', notasController.buscaNotas);
rota.get('/notas-add', notasController.buscaFormularioCadastroNota);
rota.get('/notas-edita/:notaId', notasController.buscaFormularioAtualizaNota);
rota.get('/notas-deleta/:idNota', notasController.buscaModalDeletaNota);

rota.get('/eventos', eventosController.buscaEventos);

rota.get('/error/:error', (req, res) => {
  const errorMens = req.params.error;
  res.render('error', { error: errorMens });
});

module.exports = rota;
