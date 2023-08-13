const express = require('express');
const path = require('path');
const db = require('../models/db.js');

const rota = express.Router();

rota.post('/notas', (req, res) => {
  const { titulo, descricao, cor } = req.body;

  db.run(
    'INSERT INTO notas (titulo, descricao, cor) VALUES (?, ?, ?)',
    [titulo, descricao, cor],
    (err) => {
      if (err) {
        res.redirect(`/error/${err.message}`);
      }
      res.redirect('/notas');
    }
  );
});

rota.put('/notas/:notaId', (req, res) => {
  const { titulo, descricao, cor } = req.body;
  const notaId = req.params.notaId;
  const queryStr = `UPDATE notas SET 
  titulo = ?, 
  descricao = ?,
  cor = ?
  WHERE id = ?`;

  db.run(queryStr, [titulo, descricao, cor, notaId], (err) => {
    if (err) {
      console.log('deu ruim!');
      res.redirect(`/error/${err.message}`);
    } else {
      res.redirect(303, '/notas');
    }
  });
});

module.exports = rota;
