const db = require('./connect');
const Promise = require('bluebird');

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
    get: getMsDatapoint     // (sessionTimestamp)
  }
};

// USAGE EXAMPLES
// These are from Date.now()
// let a = 1471750061364;
// let b = 1471750272798;

// addUser('user')
// addSession(a, 'user')
// getSession('user').then(res => console.log(res[0]));

// addMsDatapoint({test: 'data', array: [1,2,3,4,5]}, b, a);
// getMsDatapoint(a).then(r => console.log(r));


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

// Returns all sessions for a given user
function getSession(username) {
  return new Promise((resolve, reject) => {
    db.query(`SELECT id, session_timestamp FROM session
      WHERE user_id=(SELECT id FROM user WHERE username='${username}')`,
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
  if (typeof(datapoint) !== 'string') {
    datapoint = JSON.stringify(datapoint);
  }
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

function getMsDatapoint(sessionTimestamp) {
  return new Promise((resolve, reject) => {
    db.query(`SELECT ms_datapoint, ms_timestamp FROM microsoft WHERE session_id=
      (SELECT id FROM session WHERE session_timestamp='${sessionTimestamp}')`,
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
