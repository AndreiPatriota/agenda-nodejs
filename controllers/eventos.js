const { Evento } = require('../models/db.js');

exports.buscaEventos = async (req, res) => {
  try {
    const eventos = await Evento.findAll();
    res.render('eventos', { eventos: eventos });
  } catch (error) {
    res.render('error', { error: error });
  }
};

exports.buscaFormularioCadastroEvento = (req, res) => {
  res.render('eventos-add');
};

exports.buscaFormularioAtualizaEvento = async (req, res) => {
  const eventoId = req.params.eventoId;

  try {
    const evento = await Evento.findOne({ where: { id: eventoId } });
    res.render('eventos-edita', { evento: evento });
  } catch (error) {
    res.render('error', { error: error.message });
  }
};

exports.criaEvento = async (req, res) => {
  const { titulo, descricao, data, hora } = req.body;

  try {
    const novaNota = await Evento.create({ titulo, descricao, data, hora });
    res.redirect('/eventos');
  } catch (error) {
    res.redirect(`/error/${error.message}`);
  }
};

exports.atualizaEvento = async (req, res) => {
  const { titulo, descricao, data, hora } = req.body;
  const eventoId = req.params.eventoId;

  try {
    const [regAtualizadosCount, regAtualizados] = await Evento.update(
      { titulo, descricao, data, hora },
      { where: { id: eventoId }, returning: true }
    );
    res.redirect(303, '/eventos');
  } catch (error) {
    console.log('deu ruim!');
    res.redirect(`/error/${error.message}`);
  }
};

exports.deletaEvento = async (req, res) => {
  const eventoId = req.params.eventoId;

  try {
    await Evento.destroy({ where: { id: eventoId } });
    res.redirect(303, '/eventos');
  } catch (error) {
    console.log('deu ruim!');
    res.redirect(`/error/${error.message}`);
  }
};
