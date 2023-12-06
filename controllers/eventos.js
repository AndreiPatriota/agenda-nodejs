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
  const { idEvento, titulo, descricao, data, hora } = req.body;

  if (!idEvento) {
    Evento.create({ titulo, descricao, data, hora })
      .then((incoming) => {
        console.log('Evento criado com sucesso!');
        res.redirect('/api/eventos');
      })
      .catch((err) => {
        console.log(err.message);
        res.redirect(`/error/${err.message}`);
      });
  } else {
    Evento.findByPk(idEvento)
      .then((evento) => {
        evento.titulo = titulo;
        evento.descricao = descricao;
        evento.data = data;
        evento.hora = hora;

        return evento.save();
      })
      .then((incoming) => {
        console.log('Evento atualizado com sucesso!');
        res.redirect('/api/eventos');
      })
      .catch((err) => {
        console.log(err);
      });
  }
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
      res.redirect(303, '/api/eventos');
    })
    .catch((err) => {
      console.log(err.message);
      res.redirect(`/error/${err.message}`);
    });
};

exports.buscaListadeEventos = (req, res, next) => {
  Evento.findAll()
    .then((listadeEventos) => {
      res.render('eventos-lista', { eventos: listadeEventos });
    })
    .catch((err) => {
      console.log(err);
    });
};
