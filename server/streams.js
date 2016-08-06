const sio = require('socket.io');
const fs = require('fs');

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
        fs.writeFile(`${__dirname}/temp/${data.name}`, data.data, () => {
          console.log('file received');
        });
      });



    });
  }
};

module.exports = socketMethods;
