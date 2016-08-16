const app = require('./server/index.js');
const socket = require('./server/streams.js');

// Constants
const PORT = 8128;

const server = app.listen(PORT);
socket.startSocket(server);

console.log('Running on http://localhost:' + PORT);
