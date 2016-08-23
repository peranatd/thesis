const sio = require('socket.io');
const fs = require('fs');

const ms = require('./lib/ms.js');
const bv = require('./lib/beyondVerbal.js');
const wav = require('./lib/wav.js');
const watson = require('./lib/watson.js');
const db = require('./db/helper.js');
const format = require('./db/formatHelper.js');

const socketMethods = {
  startSocket: (app) => {
    const io = sio.listen(app);
    const audio = {};

    io.on('connection', (socket) => {
      socket.emit('message', {message: 'you are connected!'});
      console.log('user connected');

      // TODO: add an 'on user' listener to add new users to db
      // put emitter on practice component to emit username

      // Make a connection to Watson speech to text
      let streamingWatson = watson.streamingSpeechToText(socket);

      // Start a new session, add a session entry to the database
      // Check whether or not a user is in our database, add if not in
      // data = { sessionTimestamp: UNIXTIME, username: STRING }
      socket.on('sessionStart', (data) => {
        db.user.get(data.username).then(r => {
          if (!r.length) {
            return db.user.add(data.username);
          } else {
            return r;
          }
        }).then(() => {
          return db.session.add(data.sessionTimestamp, data.username);
        });
      });

      socket.on('file', (data) => {
        var dataString = data.data.split(',')[1];
        var imgBuffer = Buffer.from(dataString, 'base64');

        ms(imgBuffer)
          .then((response) => {
            socket.emit('emotion', {response: response, time: data.dataTimestamp});
            console.log(response);
            const datapoint = format.msFormatToDB(response);
            console.log('Adding to ms: ', datapoint, data.dataTimestamp, data.sessionTimestamp);
            db.ms.add(datapoint, data.dataTimestamp, data.sessionTimestamp);
          });
      });

      socket.on('audio', (data) => {
        if (data.isFinal) {
          // end the stream
          streamingWatson.audioStream(Buffer.from([]));

          bv.getToken()
          .then(token => bv.startSession(token))
          .then(res => {
            return bv.analyseData(res.token, res.body.recordingId, audio[data.id]);
          })
          .then(res => {
            socket.emit('bv', res);
            const bvData = format.bvFormatToDB(res);
            console.log('Adding to bv: ', bvData, data.sessionTimestamp);
            db.bv.add(...bvData, data.sessionTimestamp);
            delete audio[data.id];
          });
        } else {
          streamingWatson.audioStream(wav.rawData(data.data));
          audio[data.id] = audio[data.id] ? wav.concat(audio[data.id], data.data) : Buffer.from(data.data);
        }
      });

    });
  }
};

module.exports = socketMethods;
