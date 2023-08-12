const express = require('express');
const db = require('../models/db.js');

rota = express.Router();

rota.get('/', (req, res) => {
  res.render('index');
});

rota.get('/notas', (req, res) => {
  db.all('SELECT * FROM notas', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.render('notas', { notas: rows });
  });
});

rota.get('/add-notas', (req, res) => {
  res.render('add-nota');
});

rota.get('/edita-nota/:notaId', (req, res) => {
  const notaId = req.params.notaId;
  const queryStr = `SELECT * FROM notas WHERE id = ?`;
  db.get(queryStr, [notaId], (err, row) => {
    if (err) {
      console.log('Deu Ruim!');
    }
    console.log(row);
    res.render('edita-nota', { nota: row });
  });
});

rota.get('/eventos', (req, res) => {
  console.log('eventos');
  res.render('eventos');
});

module.exports = rota;
