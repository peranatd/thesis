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

      socket.on('getSession', (data) => {
        db.session.get(data).then(r => socket.emit('allSessions', r));
      });

      socket.on('getResults', (data) => {
        let result = {};
        db.ms.get(data)
        .then(r => {
          if (r.length) {
            let msFormatted = r.sort((a, b) => +a.ms_timestamp > +b.ms_timestamp)
            .map(i => format.msFormatFromDB(JSON.parse(i.ms_datapoint)));
            result.msEmotion = msFormatted;
          }
          return db.bv.get(data);
        })
        .then(r => {
          if (r.length) {
            result.bv = format.bvFormatFromDB(r[0]);
          }
          return db.watson.get(data);
        })
        .then(r => {
          if (r.length) {
            result.watson = format.watsonFormatFromDB(r[0]);
          }
          socket.emit('allResults', result);
        });
      });

      socket.on('file', (data) => {
        var dataString = data.data.split(',')[1];
        var imgBuffer = Buffer.from(dataString, 'base64');

        ms(imgBuffer)
          .then((response) => {
            socket.emit('emotion', {response: response, time: data.dataTimestamp});
            const datapoint = format.msFormatToDB(response);
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
            if (bvData) {
              db.bv.add(...bvData, data.sessionTimestamp);
            }
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
