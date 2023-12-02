/* Module imports */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const rotasNav = require('./routes/nav.js');
const rotasApi = require('./routes/api.js');
const { db } = require('./models/db.js');
const { URL } = require('url');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');

/* adicionando os middleware */
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(rotasNav);
app.use('/api/', rotasApi);

const port = 3853;
const url = new URL('/', `http:\\localhost:${port}`);
db.sync()
  .then((data) => {
    app.listen(port, () => {
      console.log(path.join(__dirname, 'public'));
      console.log(`Servidor escutando em ${url}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
