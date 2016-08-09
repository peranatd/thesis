const sio = require('socket.io');
const fs = require('fs');
const ms = require('./ms.js');

const socketMethods = {
  startSocket: (app) => {

    const io = sio.listen(app);

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
        var imgBuffer = new Buffer(dataString, 'base64');

        ms(imgBuffer)
          .then((response) => {
            socket.emit('emotion', {response: response, time: data.name});
          });
      });

    });
  }
};

module.exports = socketMethods;
