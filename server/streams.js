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
        let dataString = data.data.split(',')[1];
        let imgBuffer = new Buffer(dataString, 'base64');

        ms(imgBuffer)
          .then((response) => {
            // console.log(response);
            socket.emit('emotion', {response: response, time: data.name});
          });
        // fs.writeFile(`${__dirname}/temp/${data.name}`, data.data, () => {
        //   console.log('file received');
        // });
      });

    });
  }
};

module.exports = socketMethods;
