const db = require('./connect');
const Promise = require('bluebird');

module.exports = {
  user: {
    add: addUser,
    get: getUser
  },
  session: {
    add: addSession,
    get: getSession
  }
};

function addUser(username) {
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO user (username) VALUES ('${username}');`,
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
}

function getUser(username) {
  return new Promise((resolve, reject) => {
    db.query(`SELECT username, id FROM user WHERE username='${username}';`,
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
}

// Adds a session for the user, where sessionTimestamp
// is in Unix epoch
function addSession(username, sessionTimestamp) {
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO session (session_timestamp, user_id)
      VALUES (FROM_UNIXTIME(${sessionTimestamp}),
      (SELECT id FROM user WHERE username='${username}'))`,
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
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
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
}
