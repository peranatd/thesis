const watson = require('watson-developer-cloud');
const credential = require('./credential.js');
const Promise = require('bluebird');

const tone_analyzer = watson.tone_analyzer({
  username: credential.watson.username,
  password: credential.watson.password,
  version: 'v3',
  version_date: '2016-08-05 '
});

// Tone is a function that receives an object as input with parameter 'text' and a callback
// tone_analyzer.tone({
//   text: 'A word is dead when it is said, some say. Emily Dickinson'
// }, (err, tone) => { });

const textSentiment = function (objText) {
  return new Promise(function(resolve, reject){
    tone_analyzer.tone(objText, function (err, tone) {
      if (err) {
        reject(err);
      } else {
        console.log(tone);
        resolve(tone);
      }
    });
  });
};

module.exports = textSentiment;
