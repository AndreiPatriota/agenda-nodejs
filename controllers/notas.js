const { Nota } = require('../models/db.js');

exports.buscaNotas = async (req, res) => {
  try {
    const notas = await Nota.findAll();
    res.render('notas', { notas: notas });
  } catch (error) {
    res.render('error', { error: error.message });
  }
};

exports.buscaFormularioCadastroNota = (req, res) => {
  res.render('notas-add');
};

exports.buscaFormularioAtualizaNota = async (req, res) => {
  const notaId = req.params.notaId;

  try {
    const nota = await Nota.findOne({ where: { id: notaId } });
    res.render('notas-edita', { nota: nota });
  } catch (error) {
    res.render('error', { error: error.message });
  }
};

exports.buscaModalDeletaNota = (req, res) => {
  const idNota = req.params.idNota;
  res.render('notas-deleta', { id: idNota });
};

exports.criaNota = async (req, res) => {
  const { titulo, descricao, cor } = req.body;

  try {
    const novaNota = await Nota.create({ titulo, descricao, cor });
    res.redirect('/notas');
  } catch (error) {
    res.redirect(`/error/${error.message}`);
  }
};

exports.atualizaNota = async (req, res) => {
  const { titulo, descricao, cor } = req.body;
  const notaId = req.params.notaId;

  try {
    const [regAtualizadosCount, regAtualizados] = await Nota.update(
      { titulo, descricao, cor },
      { where: { id: notaId }, returning: true }
    );
    res.redirect(303, '/notas');
  } catch (error) {
    console.log('deu ruim!');
    res.redirect(`/error/${error.message}`);
  }
};

exports.deletaNota = async (req, res) => {
  const notaId = req.params.notaId;

  try {
    await Nota.destroy({ where: { id: notaId } });
    res.redirect(303, '/notas');
  } catch (error) {
    console.log('deu ruim!');
    res.redirect(`/error/${error.message}`);
  }
};
