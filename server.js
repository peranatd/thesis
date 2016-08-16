const app = require('./server/index.js');
const socket = require('./server/streams.js');

// Constants
const PORT = 8128;

const server = app.listen(PORT,function(){
  app.on('stormpath.ready', function () {
    console.log('\nListening at http://localhost:' + PORT);
    // Now bring back error logging.
    app.get('stormpathLogger').transports.console.level = 'error';
  });
});
socket.startSocket(server);

console.log('Running on http://localhost:' + PORT);
