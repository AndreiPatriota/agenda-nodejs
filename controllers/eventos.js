const { Evento } = require('../models/db.js');

exports.buscaEventos = (req, res) => {
  Evento.findAll()
    .then((listadeEventos) => {
      res.render('eventos', { eventos: listadeEventos });
    })
    .catch((err) => {
      console.log(err);
      res.render('error', { error: err });
    });
};

exports.buscaFormularioCadastroEvento = (req, res) => {
  res.render('eventos-add');
};

exports.buscaFormularioAtualizaEvento = (req, res) => {
  const eventoId = req.params.eventoId;

  Evento.findByPk(eventoId)
    .then((evento) => {
      res.render('eventos-edita', { evento: evento });
    })
    .catch((err) => {
      console.log(err.message);
      res.render('error', { error: err.message });
    });
};

exports.buscaModalDeletaEvento = (req, res) => {
  const idEvento = req.params.eventoId;
  res.render('eventos-deleta', { id: idEvento });
};

exports.criaEvento = (req, res) => {
  const { titulo, descricao, data, hora } = req.body;

  Evento.create({ titulo, descricao, data, hora })
    .then((incoming) => {
      res.redirect('/eventos');
    })
    .catch((err) => {
      console.log(err.message);
      res.redirect(`/error/${err.message}`);
    });
};

exports.atualizaEvento = (req, res) => {
  const { titulo, descricao, data, hora } = req.body;
  const eventoId = req.params.eventoId;

  Evento.findByPk(eventoId)
    .then((evento) => {
      evento.titulo = titulo;
      evento.descricao = descricao;
      evento.data = data;
      evento.hora = hora;

      return evento.save();
    })
    .then((incoming) => {
      console.log('Evento atualizado com sucesso!');
      res.redirect(303, '/eventos');
    })
    .catch((err) => {
      console.log(err.message);
      res.redirect(`/error/${error.message}`);
    });
};

exports.deletaEvento = (req, res) => {
  const eventoId = req.params.eventoId;

  Evento.findByPk(eventoId)
    .then((evento) => {
      return evento.destroy();
    })
    .then((incoming) => {
      console.log('Evento deletado com sucesso!');
      res.redirect(303, '/eventos');
    })
    .catch((err) => {
      console.log(err.message);
      res.redirect(`/error/${err.message}`);
    });
};
