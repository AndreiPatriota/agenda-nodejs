const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const db = new sqlite3.Database(path.join('.', 'models', 'base.db'));
db.serialize(() => {
  db.run(`
      CREATE TABLE IF NOT EXISTS notas (
        id INTEGER PRIMARY KEY,
        titulo TEXT,
        descricao TEXT,
        cor TEXT
      )
    `);
});

const myDb = new Sequelize({
  dialect: 'sqlite',
  storage: './base.db',
});
const Nota = myDb.define('_notas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
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
  cor: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});

// sincronização com o banco de dados
myDb
  .sync()
  .then(() => {
    console.log('Banco de dados e tabelas criadas!');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o banco de dados', error);
  });

module.exports = db;
