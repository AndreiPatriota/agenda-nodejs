const { Tarefa } = require('../models/db');

exports.buscaTarefas = (req, res) => {
  Tarefa.findAll()
    .then((listadeTarefas) => {
      res.render('tarefas', { listadeTarefas: listadeTarefas });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.buscaListadeTarefas = (req, res) => {
  Tarefa.findAll()
    .then((listadeTarefas) => {
      res.render('tarefas-lista', { listadeTarefas: listadeTarefas });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.criaTarefa = (req, res) => {
  const { descricao, dataLimite } = req.body;
  const concluido = false;

  Tarefa.create({ descricao, dataLimite, concluido })
    .then((data) => {
      console.log('Tarefa criada');
      res.redirect('/api/tarefas');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deletaTarefa = (req, res, next) => {
  const idTarefa = req.params.idTarefa;

  Tarefa.findByPk(idTarefa)
    .then((tarefa) => {
      return tarefa.destroy();
    })
    .then((data) => {
      console.log('Tarefa deletada com sucesso!');
      res.redirect(303, '/api/tarefas');
    })
    .catch((err) => {
      console.log(err);
    });
};
