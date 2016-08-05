const express = require('express');
const partials = require('express-partials');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
// const session = require('express-session');

const textSentiment = require('./watson.js')

// App
const app = express();

app.use(partials());
app.use(bodyParser.json());
app.use(serveStatic(__dirname + '/../build'));

app.post('/api/text', function (req, res) {
  // console.log(req.body);
  textSentiment(req.body)
    .then(result => res.status(201).send(result))
    .catch(err => res.status(201).send(err));
});

module.exports = app;