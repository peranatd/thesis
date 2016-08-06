const app = require('./server/index.js');

// Constants
const PORT = 8128;

const server = app.listen(PORT);

const io = require('socket.io').listen(server);

io.on('connection', (socket) => {
  socket.emit('message', {message: 'you are connected!'});
  console.log('user connected');
});

console.log('Running on http://localhost:' + PORT);
