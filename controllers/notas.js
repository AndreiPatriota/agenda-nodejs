const db = require('../models/db');

exports.buscaNotas = (req, res) => {
  db.all('SELECT * FROM notas', (err, rows) => {
    if (err) {
      res.render('error', { error: err.message });
    }
    res.render('notas', { notas: rows });
  });
};

exports.buscaFormularioCadastroNota = (req, res) => {
  res.render('notas-add');
};

exports.buscaFormularioAtualizaNota = (req, res) => {
  const notaId = req.params.notaId;
  const queryStr = `SELECT * FROM notas WHERE id = ?`;
  db.get(queryStr, [notaId], (err, row) => {
    if (err) {
      res.render('error', { error: err.message });
    }
    res.render('notas-edita', { nota: row });
  });
};

exports.buscaModalDeletaNota = (req, res) => {
  const idNota = req.params.idNota;
  res.render('notas-deleta', { id: idNota });
};

exports.salvaNota = (req, res) => {
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
};

exports.atualizaNota = (req, res) => {
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
};

exports.deletaNota = (req, res) => {
  const notaId = req.params.notaId;

  db.run('DELETE FROM notas WHERE id = ?', notaId, function (err) {
    if (err) {
      console.log('deu ruim!');
      res.redirect(`/error/${err.message}`);
    }
    res.redirect(303, '/notas');
  });
};
