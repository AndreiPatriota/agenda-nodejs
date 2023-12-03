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
  const { id, descricao, dataLimite } = req.body;
  const concluido = false;

  if (!id) {
    Tarefa.create({ descricao, dataLimite, concluido })
      .then((data) => {
        console.log('Tarefa criada com sucesso!');
        res.redirect('/api/tarefas');
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    Tarefa.findByPk(id)
      .then((tarefa) => {
        tarefa.descricao = descricao;
        tarefa.dataLimite = dataLimite;

        return tarefa.save();
      })
      .then((data) => {
        console.log('Tarefa atualizada com sucesso!');
        res.redirect('/api/tarefas');
      })
      .catch((err) => {
        console.log.err;
      });
  }
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

exports.completaTarefa = (req, res, next) => {
  const idTarefa = req.params.idTarefa;

  Tarefa.findByPk(idTarefa)
    .then((tarefa) => {
      tarefa.concluido = !tarefa.concluido;
      return tarefa.save();
    })
    .then((data) => {
      res.redirect(303, '/api/tarefas');
    })
    .catch((err) => {
      console.log(err);
    });
};
