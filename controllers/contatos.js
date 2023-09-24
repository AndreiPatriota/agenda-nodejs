const { Contato } = require('../models/db');

exports.buscaContatos = async (req, res, next) => {
  try {
    const contatos = await Contato.findAll();
    console.log(`Bundinha ${contatos}`);
    res.render('contatos', { contatos: contatos });
  } catch (error) {
    res.render('error', { error: error.message });
  }
};

exports.buscaFormularioCadastroContato = (req, res, next) => {
  res.render('contatos-add-edita', { edita: false, contato: null });
};

exports.buscaFormularioEditaContato = async (req, res, next) => {
  const contatoId = req.params.contatoId;

  try {
    const contato = await Contato.findOne({ where: { id: contatoId } });
    res.render('contatos-add-edita', { edita: true, contato: contato });
  } catch (error) {
    res.redirect(`/error/${error.message}`);
  }
};

exports.criaContato = async (req, res, next) => {
  let fotoUrl = 'MA OIIIEEEEEEWWWW';

  if (req.file) {
    fotoUrl = req.file.filename;
  }

  console.log(`O nome da foto é ${fotoUrl}`);
  const { primeiroNome, ultimoNome, telefone, email, arroba, empresa } =
    req.body;

  try {
    const contato = await Contato.create({
      primeiroNome,
      ultimoNome,
      telefone,
      fotoUrl,
      email,
      arroba,
      empresa,
    });
    res.redirect('/contatos');
  } catch (error) {
    res.redirect(`/error/${error.message}`);
  }
};

exports.atualizaContato = async (req, res, next) => {
  const contatoId = req.params.contatoId;
  const { primeiroNome, ultimoNome, telefone, email, arroba, empresa } =
    req.body;

  try {
    const [regAtualizadosCount, regAtualizados] = await Contato.update(
      {
        primeiroNome: primeiroNome,
        ultimoNome: ultimoNome,
        telefone: telefone,
        email: email,
        arroba: arroba,
        empresa: empresa,
      },
      { where: { id: contatoId }, returning: true }
    );
    res.redirect(303, '/contatos');
  } catch (error) {
    console.log('deu ruim!');
    res.redirect(`/error/${error.message}`);
  }
};
