const app = require('./server/index.js');

// Constants
const PORT = 8128;

app.listen(PORT);

console.log('Running on http://localhost:' + PORT);