const credential = require('./credential.js');
const Promise = require('bluebird');

function emotion(req, res) {
  console.log(req);
  res.status(201).send()
}

module.exports = emotion



// POST https://api.projectoxford.ai/emotion/v1.0/recognize HTTP/1.1
// Content-Type: application/json
// Host: api.projectoxford.ai
// Content-Length: 78
// Ocp-Apim-Subscription-Key: ••••••••••••••••••••••••••••••••
// { "url": "http://www.whatsappimagens.com/imagens/imagens-imagens-face-3.jpg" }
