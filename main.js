/* Module imports */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const rotaNav = require('./controllers/nav.js');
const rotaApi = require('./controllers/api.js');

const port = 8080;
const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');

/* Adding some Middleware */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(rotaNav);
app.use('/api/', rotaApi);

app.listen(port, () => {
  console.log(path.join(__dirname, 'public'));
  console.log(`Servidor rodando na porta ${port}`);
});
