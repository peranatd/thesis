const sio = require('socket.io');
const fs = require('fs');
const ms = require('./ms.js');
const beyondVerbal = require('./beyondVerbal.js');

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
        // console.log();
        // TODO
        if (data.isFinal) {
          console.log(data);
          fs.writeFile('./server/audio.webm', audio[data.id], (err) => {
            if (err) console.log(err);
            console.log('File saved!')
          })
        } else {
          audio[data.id] = audio[data.id] ? Buffer.concat([audio[data.id], data.data]) : Buffer.from(data.data);
        }
      });

    });
  }
};

module.exports = socketMethods;
