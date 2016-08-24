const db = require('./connect');
const Promise = require('bluebird');
const format = require('./formatHelper');

module.exports = {
  user: {                   // ARGUMENTS
    add: addUser,           // (username)
    get: getUser            // (username)
  },                        //
  session: {                //
    add: addSession,        // (sessionTimestamp, username)
    get: getSession         // (username)
  },                        //
  ms: {                     //
    add: addMsDatapoint,    // (datapoint, dataTimestamp, sessionTimestamp)
    get: getMsDatapoint     // (sessionId)
  },                        //
  bv: {                     //
    add: addBvData,         // (summary, mood, sessionTimestamp)
    get: getBvData          // (sessionId)
  },                        //
  watson: {                 //
    add: addWatsonData,     // (emotion, language, social, transcript, sessionTimestamp)
    get: getWatsonData      // (sessionId)
  }
};

// USAGE EXAMPLES
// These are from Date.now()
// let a = 1471750061364;
// let b = 1471750272798;

// addUser('user')
// addSession(a, 'user')
// getSession('user').then(res => console.log(res[0]));
// let c = format.watsonFormatToDB({}, 'Test 1,2,3');
// addWatsonData(...c, a);
// getWatsonData(1).then(r => console.log(r[0]));
// getWatsonData(1).then(r => console.log(JSON.stringify(format.watsonFormatFromDB(r[0]),null,3)));


function addUser(username) {
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO user (username) VALUES ('${username}');`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

function getUser(username) {
  return new Promise((resolve, reject) => {
    db.query(`SELECT username, id FROM user WHERE username='${username}';`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

// Adds a session for the user, where sessionTimestamp
// is in Unix time
function addSession(sessionTimestamp, username) {
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO session (session_timestamp, user_id)
      VALUES ('${sessionTimestamp}',
      (SELECT id FROM user WHERE username='${username}'))`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

// select distinct session.id,session.session_timestamp from session inner join microsoft on session.id=microsoft.session_id;
// Returns all sessions for a given user
function getSession(username) {
  return new Promise((resolve, reject) => {
    db.query(`SELECT DISTINCT session.id, session.session_timestamp FROM session
      INNER JOIN microsoft on session.id=microsoft.session_id WHERE session.user_id=(SELECT id FROM user WHERE username='${username}') ORDER BY session.session_timestamp DESC`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

function addMsDatapoint(datapoint, dataTimestamp, sessionTimestamp) {
  if (typeof(datapoint) !== 'string') { datapoint = JSON.stringify(datapoint); }
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO microsoft (ms_datapoint, ms_timestamp, session_id)
      VALUES ('${datapoint}', '${dataTimestamp}',
      (SELECT id FROM session WHERE session_timestamp='${sessionTimestamp}'))`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

function getMsDatapoint(sessionId) {
  return new Promise((resolve, reject) => {
    db.query(`SELECT ms_datapoint, ms_timestamp FROM microsoft WHERE
      session_id='${sessionId}'`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

function addBvData(summary, mood, sessionTimestamp) {
  if (typeof(summary) !== 'string') { summary = JSON.stringify(summary); }
  if (typeof(mood) !== 'string') { mood = JSON.stringify(mood); }
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO bv (bv_summary, bv_mood, session_id)
      VALUES ('${summary}', '${mood}', (SELECT id FROM session
      WHERE session_timestamp='${sessionTimestamp}'))`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

function getBvData(sessionId) {
  return new Promise((resolve, reject) => {
    db.query(`SELECT bv_summary, bv_mood FROM bv WHERE session_id='${sessionId}'`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

function addWatsonData(emotion, language, social, transcript, sessionTimestamp) {
  if (typeof(emotion) !== 'string') { emotion = JSON.stringify(emotion); }
  if (typeof(language) !== 'string') { language = JSON.stringify(language); }
  if (typeof(social) !== 'string') { social = JSON.stringify(social); }
  if (typeof(transcript) !== 'string') { transcript = JSON.stringify(transcript); }
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO watson
      (wn_emotion, wn_language, wn_social, wn_transcription, session_id)
      VALUES ('${emotion}', '${language}', '${social}', '${transcript}',
      (SELECT id FROM session WHERE session_timestamp='${sessionTimestamp}'))`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

function getWatsonData(sessionId) {
  return new Promise((resolve, reject) => {
    db.query(`SELECT wn_emotion, wn_language, wn_social, wn_transcription
      FROM watson WHERE session_id='${sessionId}'`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}
