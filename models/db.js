const sqlite3 = require('sqlite3').verbose();
const path = require('path');

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

module.exports = db;
