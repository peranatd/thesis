const sio = require('socket.io');
const fs = require('fs');

const ms = require('./lib/ms.js');
const bv = require('./lib/beyondVerbal.js');
const wav = require('./lib/wav.js');
const watson = require('./lib/watson.js');

const socketMethods = {
  startSocket: (app) => {
    const io = sio.listen(app);
    const audio = {};

    io.on('connection', (socket) => {
      /*
       *  add more listeners in here
       */
      socket.emit('message', {message: 'you are connected!'});
      console.log('user connected');

      socket.on('file', (data) => {
        console.log('receiving ', data.name);
        console.log(data.data.length, ' bytes');
        var dataString = data.data.split(',')[1];
        var imgBuffer = Buffer.from(dataString, 'base64');

        ms(imgBuffer)
          .then((response) => {
            socket.emit('emotion', {response: response, time: data.name});
          });
      });

      socket.on('audio', (data) => {
        // TODO: call 2 separate apis
        if (data.isFinal) {
          bv.getToken()
          .then(token => bv.startSession(token))
          .then(res => {
            // console.log(res.token, res.body.recordingId);
            return bv.analyseData(res.token, res.body.recordingId, audio[data.id]);
          })
          .then(res => {
            socket.emit('bv', res);
          });

          watson.speechToText(audio[data.id])
          .then(res => {
            socket.emit('stt', res);
          })
          .catch(err => {
            console.log(err);
          });
        } else {
          console.log(data);
          audio[data.id] = audio[data.id] ? wav.concat(audio[data.id], data.data) : Buffer.from(data.data);
        }
      });

    });
  }
};

module.exports = socketMethods;
