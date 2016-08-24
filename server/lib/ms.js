const Promise = require('bluebird');
const request = require('request');
let credential;

if (process.env.MS_KEY) {
  credential = {
    microsoft: {
      key: process.env.MS_KEY
    }
  };
} else {
  credential = require('../credential.js');
}

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
        resolve(body);
      }
    });
  });
}

module.exports = emotion;
