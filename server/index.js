const express = require('express');
const partials = require('express-partials');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const fs = require('fs')
// const session = require('express-session');

const textSentiment = require('./watson.js');
const ms = require('./ms.js');

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
app.post('/api/image', function(req, res) {
  let image = Buffer.from(req.body.image.split(',')[1], 'base64');
  ms(image)
    .then(body => {
      console.log(body);
      res.status(201).send(body);
    });
});

module.exports = app;
