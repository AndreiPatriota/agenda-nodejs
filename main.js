/* Module imports */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const rotasNav = require('./routes/nav.js');
const rotasApi = require('./routes/api.js');

const port = 8080;
const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');

/* adicionando os middleware */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(rotasNav);
app.use('/api/', rotasApi);

app.listen(port, () => {
  console.log(path.join(__dirname, 'public'));
  console.log(`Servidor rodando na porta ${port}`);
});
