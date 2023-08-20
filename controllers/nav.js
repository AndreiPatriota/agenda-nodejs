const express = require('express');
const db = require('../models/db.js');

rota = express.Router();

rota.get('/', (req, res) => {
  res.render('index');
});

rota.get('/home', (req, res) => {
  res.render('home');
});

rota.get('/notas-deleta/:idNota', (req, res) => {
  const idNota = req.params.idNota;
  res.render('notas-deleta', { id: idNota });
});

rota.get('/notas', (req, res) => {
  db.all('SELECT * FROM notas', (err, rows) => {
    if (err) {
      res.render('error', { error: err.message });
    }
    res.render('notas', { notas: rows });
  });
});

rota.get('/notas-add', (req, res) => {
  res.render('notas-add');
});

rota.get('/notas-edita/:notaId', (req, res) => {
  const notaId = req.params.notaId;
  const queryStr = `SELECT * FROM notas WHERE id = ?`;
  db.get(queryStr, [notaId], (err, row) => {
    if (err) {
      res.render('error', { error: err.message });
    }
    res.render('notas-edita', { nota: row });
  });
});

rota.get('/eventos', (req, res) => {
  res.render('eventos');
});

rota.get('/error/:error', (req, res) => {
  const errorMens = req.params.error;
  res.render('error', { error: errorMens });
});

module.exports = rota;
