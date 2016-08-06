const express = require('express');
const partials = require('express-partials');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const multer  = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const textSentiment = require('./watson.js');
const ms = require('./ms.js');

// App
const app = express();

app.use(partials());
app.use(bodyParser.json());
app.use(serveStatic(__dirname + '/../build'));

app.post('/api/text', function (req, res) {
  textSentiment(req.body)
    .then(result => res.status(201).send(result))
    .catch(err => res.status(201).send(err));
});

app.post('/api/image', upload.single('image'), function (req, res) {
  ms(req.file.buffer)
    .then(body => {
      res.status(201).send(body);
    });
});

module.exports = app;
