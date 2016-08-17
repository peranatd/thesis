const credential = require('../credential.js');
const Promise = require('bluebird');
const request = require('request');

function emotion(imgBuffer) {
  const options = {
    url: 'https://api.projectoxford.ai/emotion/v1.0/recognize',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Length': imgBuffer.length,
      'Ocp-Apim-Subscription-Key': credential.microsoft.key
    },
    body: imgBuffer
  };
  return new Promise((resolve, reject) => {
    request.post(options, (err, response, body) => {
      if (err) {
        reject(err);
      } else {
        // console.log(body);
        resolve(body);
      }
    });
  });
}

module.exports = emotion;



// POST https://api.projectoxford.ai/emotion/v1.0/recognize HTTP/1.1
// Content-Type: application/json
// Host: api.projectoxford.ai
// Content-Length: 78
// Ocp-Apim-Subscription-Key: ••••••••••••••••••••••••••••••••
// { "url": "http://www.whatsappimagens.com/imagens/imagens-imagens-face-3.jpg" }
