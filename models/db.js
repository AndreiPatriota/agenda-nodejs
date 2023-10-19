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

const Tarefa = db.define('tarefas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  dataLimite: {
    type: DataTypes.DATE,
    allowNull: true,
    unique: false,
  },
  concluido: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    unique: false,
  },
});

/* exporta os modelos */
exports.Nota = Nota;
exports.Evento = Evento;
exports.Contato = Contato;
exports.Tarefa = Tarefa;
exports.db = db;
