const { Nota } = require('../models/db.js');

exports.buscaNotas = (req, res) => {
  Nota.findAll()
    .then((listadeNotas) => {
      res.render('notas', { notas: listadeNotas });
    })
    .catch((err) => {
      console.log(err);
      res.render('error', { error: err });
    });
};

exports.buscaFormularioCadastroNota = (req, res) => {
  res.render('notas-add');
};

exports.buscaFormularioAtualizaNota = (req, res) => {
  const notaId = req.params.notaId;

  Nota.findByPk(notaId)
    .then((nota) => {
      res.render('notas-edita', { nota: nota });
    })
    .catch((err) => {
      console.log(err);
      res.render('error', { error: err });
    });
};

exports.buscaModalDeletaNota = (req, res) => {
  const idNota = req.params.idNota;
  res.render('notas-deleta', { id: idNota });
};

exports.criaNota = (req, res) => {
  const { idNota, titulo, descricao, cor } = req.body;

  if (!idNota) {
    Nota.create({ titulo, descricao, cor })
      .then((data) => {
        console.log('Nota criada com sucesso!');
        res.redirect('/api/notas');
      })
      .catch((err) => {
        console.log(err);
        res.redirect(`/error/${err}`);
      });
  } else {
    Nota.findByPk(idNota)
      .then((nota) => {
        nota.titulo = titulo;
        nota.descricao = descricao;
        nota.cor = cor;
        return nota.save();
      })
      .then((data) => {
        console.log('Nota atualizada com sucesso!');
        res.redirect('/api/notas');
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.atualizaNota = async (req, res) => {
  const { titulo, descricao, cor } = req.body;
  const notaId = req.params.notaId;

  Nota.findByPk(notaId)
    .then((nota) => {
      nota.titulo = titulo;
      nota.descricao = descricao;
      nota.cor = cor;

      return nota.save();
    })
    .then((incoming) => {
      console.log('Nota atualizada com sucesso');
      res.redirect(303, '/notas');
    })
    .catch((err) => {
      console.log(err);
      res.redirect(`/error/${err}`);
    });
};

exports.deletaNota = (req, res) => {
  const notaId = req.params.notaId;

  Nota.findByPk(notaId)
    .then((nota) => {
      return nota.destroy();
    })
    .then((incoming) => {
      console.log('Nota deletada com sucesso');
      res.redirect(303, '/api/notas');
    })
    .catch((err) => {
      console.log(err);
      res.redirect(`/error/${err}`);
    });
};

exports.buscaListadeNotas = (req, res, next) => {
  Nota.findAll()
    .then((listadeNotas) => {
      res.render('notas-lista', { notas: listadeNotas });
    })
    .catch((err) => {
      console.log(err);
    });
};
