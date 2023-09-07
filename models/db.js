const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

/* instancia o banco */
const db = new Sequelize({
  dialect: 'sqlite',
  storage: './base',
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
