const sio = require('socket.io');
const fs = require('fs');
const ms = require('./ms.js');
const bv = require('./beyondVerbal.js');
// const Resampler = require('resampler');

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
          console.log(data);
          fs.writeFile('./server/audio', audio[data.id], (err) => {
            if (err) console.log(err);
            console.log('File saved!');
          });
          bv.getToken()
          .then(token => bv.startSession(token))
          .then(res => {
            console.log(res.token, res.body.recordingId);
            console.log(typeof(audio[data.id]));
            return bv.analyseData(res.token, res.body.recordingId, audio[data.id]);
          }).then(res => {
            socket.emit('bv', res);
          });
        } else {
          console.log(data);
          audio[data.id] = audio[data.id] ? Buffer.concat([audio[data.id], data.data]) : Buffer.from(data.data);
        }
      });

    });
  }
};

module.exports = socketMethods;
