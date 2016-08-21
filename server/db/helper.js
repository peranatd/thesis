const db = require('./connect');
const Promise = require('bluebird');

module.exports = {
  user: {
    add: addUser,
    get: getUser
  },
  session: {
    add: addSession
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



