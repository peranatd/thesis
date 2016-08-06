const sio = require('socket.io');

const socketMethods = {
  startSocket: (app) => {
    const io = sio.listen(app);
    io.on('connection', (socket) => {
      socket.emit('message', {message: 'you are connected!'});
      console.log('user connected');
    });
  }
};

module.exports = socketMethods;
