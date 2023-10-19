const express = require('express');
const notasController = require('../controllers/notas.js');
const eventosController = require('../controllers/eventos.js');
const contatosController = require('../controllers/contatos.js');
const tarefasController = require('../controllers/tarefas.js');

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
rota.get('/eventos-add', eventosController.buscaFormularioCadastroEvento);
rota.get(
  '/eventos-edita/:eventoId',
  eventosController.buscaFormularioAtualizaEvento
);
rota.get('/eventos-deleta/:eventoId', eventosController.buscaModalDeletaEvento);

rota.get('/contatos', contatosController.buscaContatos);
rota.get('/contatos-add', contatosController.buscaFormularioCadastroContato);
rota.get(
  '/contatos-edita/:contatoId',
  contatosController.buscaFormularioEditaContato
);

rota.get('/tarefas', tarefasController.buscaTarefas);

rota.get('/error/:error', (req, res) => {
  const errorMens = req.params.error;
  res.render('error', { error: errorMens });
});

module.exports = rota;
