const app = require('express')();
const partials = require('express-partials');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');

const path = require('path');

const multer  = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const watson = require('./lib/watson.js');
const ms = require('./lib/ms.js');
const db = require('./db/helper.js');
const format = require('./db/formatHelper.js');

app.use(partials());
app.use(bodyParser.json());
app.use(serveStatic(__dirname + '/../build'));

const stormpath = require('express-stormpath');

app.use(stormpath.init(app, {
  // Disable logging until startup, so that we can catch errors
  // and display them nicely.
  debug: 'none',
  web: {
    produces: ['application/json'],
    login: {
      nextUri: '/practice'
    }
  }
}));

app.get('/practice', bodyParser.json(), stormpath.loginRequired, function (req, res) {
  function writeError(message) {
    res.status(400);
    res.json({ message: message, status: 400 });
    res.end();
  }

  function saveAccount() {
    req.user.givenName = req.body.givenName;
    req.user.surname = req.body.surname;
    req.user.email = req.body.email;

    req.user.save(function (err) {
      if (err) {
        return writeError(err.userMessage || err.message);
      }
      res.end();
    });
  }

  if (req.body.password) {
    var application = req.app.get('stormpathApplication');

    application.authenticateAccount({
      username: req.user.username,
      password: req.body.existingPassword
    }, function (err) {
      if (err) {
        return writeError('The existing password that you entered was incorrect.');
      }

      req.user.password = req.body.password;

      saveAccount();
    });
  } else {
    saveAccount();
  }
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.post('/api/text', function (req, res) {
  watson.textSentiment(req.body)
    .then(result => {
      res.status(201).send(result);
      console.log(req.body);
      const data = format.watsonFormatToDB(result, req.body.text);
      console.log('Adding to watson: ', data);
      db.watson.add(...data, req.body.sessionTimestamp);
    })
    .catch(err => res.status(201).send(err));
});

app.post('/api/image', upload.single('image'), function (req, res) {
  ms(req.file.buffer)
    .then(body => {
      res.status(201).send(body);
    });
});

module.exports = app;
