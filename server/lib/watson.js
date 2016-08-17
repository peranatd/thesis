const watson = require('watson-developer-cloud');
const stream = require('stream');

const credential = require('../credential.js');
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

// This is now replaced by the streaming version
// No longer used
const speechToText = function (file) {

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
  });
};

// This is a constructor for the streaming speech to text handler object.
// Takes a socket that should be used to emit a 'streamingSpeechToText'
// event on getting responses from Watson.
const streamingSpeechToText = function (socket) {
  const self = {};
  self.socket = socket;

  const params = {
    content_type: 'audio/l16;rate=8000;channels=1',
    continuous: true,
    interim_results: true,
    model: 'en-US_NarrowbandModel',
    timestamps: true
  };

  let recognizeStream = speech_to_text.createRecognizeStream(params);
  recognizeStream.setEncoding('utf8');

  // Listen for events
  recognizeStream.on('results', onResults );
  recognizeStream.on('data', (event) => { onEvent('data:', event); } );
  recognizeStream.on('error', function(event) { onEvent('Error:', event); });
  recognizeStream.on('close-connection', function(event) { onEvent('Close:', event); });

  // logs events on the console, passed to recognizeStream
  function onEvent(name, event) {
    // console.log(name, JSON.stringify(event, null, 3));
    return;
  }

  function onResults(event) {
    self.socket.emit('streamingSpeechToText', event);
    console.log(event);
  }

  // create a passthrough stream (duplex stream) from an audio buffer
  // passed into the functions below
  let bufferStream = new stream.PassThrough();
  self.recognizeStream = recognizeStream;
  bufferStream.pipe(self.recognizeStream);

  self.audioStream = function(audioBuffer) {
    bufferStream.write(audioBuffer);
  };
  self.end = function(audioBuffer) {
    bufferStream.end(audioBuffer);
  };

  return self;
};

module.exports = {
  textSentiment: textSentiment,
  speechToText: speechToText,
  streamingSpeechToText: streamingSpeechToText
};
