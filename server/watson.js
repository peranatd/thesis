const watson = require('watson-developer-cloud');
const stream = require('stream');

const credential = require('./credential.js');
const Promise = require('bluebird');

const tone_analyzer = watson.tone_analyzer({
  username: credential.watson.username,
  password: credential.watson.password,
  version: 'v3',
  version_date: '2016-08-05'
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
        resolve(tone);
      }
    });
  });
};

var speech_to_text = watson.speech_to_text({
  username: credential.speechToText.username,
  password: credential.speechToText.password,
  version: 'v1',
  version_date: '2016-08-05'
});

const speechToText = function (file) {
  console.log('SPEECH TO TEXT');

  let bufferStream = new stream.PassThrough();
  bufferStream.end(file);
  // bufferStream.pipe();
  console.log(bufferStream);
  let params = {
    audio: bufferStream,
    content_type: 'audio/wav',
    timestamps: true,
    word_alternatives_threshold: 0.9,
    continuous: true,
    model: 'en-US_NarrowbandModel'
  };

  return new Promise(function (resolve, reject) {
    speech_to_text.recognize(params, function(error, transcript) {
      if (error) {
        reject(error);
      } else {
        console.log('INSIDE SPEECH TO TEXT ', JSON.stringify(transcript, null, 2));
        resolve(JSON.stringify(transcript, null, 2));
      }
    });
  })
}

module.exports = {
  textSentiment: textSentiment,
  speechToText: speechToText
};
