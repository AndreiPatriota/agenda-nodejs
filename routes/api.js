const express = require('express');
const multer = require('multer');
const notaController = require('../controllers/notas.js');
const eventoController = require('../controllers/eventos.js');
const contatosController = require('../controllers/contatos.js');
const tarefasController = require('../controllers/tarefas.js');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/imagens');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e4);
    cb(null, 'laga-' + uniqueSuffix + '.png');
  },
});

const upload = multer({ storage: storage });

const rota = express.Router();
rota.post('/notas', notaController.criaNota);
rota.put('/notas/:notaId', notaController.atualizaNota);
rota.delete('/notas/:notaId', notaController.deletaNota);

rota.post('/eventos', eventoController.criaEvento);
rota.put('/eventos/:eventoId', eventoController.atualizaEvento);
rota.delete('/eventos/:eventoId', eventoController.deletaEvento);

rota.post(
  '/contatos',
  upload.single('foto-perfil'),
  contatosController.criaContato
);
rota.put('/contatos/:contatoId', contatosController.atualizaContato);

rota.get('/tarefas', tarefasController.buscaListadeTarefas);
rota.patch('/tarefas/:idTarefa', tarefasController.completaTarefa);
rota.post('/tarefas', tarefasController.criaTarefa);
rota.delete('/tarefas/:idTarefa', tarefasController.deletaTarefa);

module.exports = rota;
