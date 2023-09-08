const { Sequelize, DataTypes } = require('sequelize');

/* instancia o banco */
const db = new Sequelize({
  dialect: 'sqlite',
  storage: './models/base.db',
});

/* cria os modelos aqui */
const Nota = db.define('notas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  cor: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
});

const Evento = db.define('eventos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
    unique: false,
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false,
    unique: false,
  },
});

const Contato = db.define('contatos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  primeiroNome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  ultimoNome: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  fotoUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  arroba: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  empresa: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
});

/* sincronização com o banco de dados */
db.sync()
  .then(() => {
    console.log('Banco de dados e tabelas criadas!');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o banco de dados', error);
  });

/* exporta os modelos */
exports.Nota = Nota;
exports.Evento = Evento;
exports.Contato = Contato;
