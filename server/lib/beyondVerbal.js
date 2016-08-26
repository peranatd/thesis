const Promise = require('bluebird');
const request = require('request');
let key;

if (process.env.BV_KEY) {
  key = process.env.BV_KEY;
} else {
  key = require('../credential.js').beyondverbal.key;
}

// function to get access_token, returns a promise with the
// object {'access_token': ,'token_type': ,'expires_in': }
// available for then callback
function getToken() {
  const options = {
    url: 'https://token.beyondverbal.com/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: {
      'grant_type': 'client_credentials',
      'apikey' : key
    }
  };
  return new Promise((resolve, reject) => {
    request.post(options, (err, res, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(body)['access_token']);
      }
    });
  });
}

// initialises recording session, returns a promise containing
// the object {'status': 'success', 'recordingId': id}
function startSession(token) {
  const options = {
    url: 'https://apiv3.beyondverbal.com/v3/recording/start',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      'dataFormat': {
        'type': 'WAV'
      }
    })
  };
  return new Promise((resolve, reject) => {
    request.post(options, (err, res, body) => {
      if (err) {
        reject(err);
      } else {
        resolve({body: JSON.parse(body), token: token});
      }
    });
  });
}


function analyseData(token, id, audioFile) {
  const options = {
    url: 'https://apiv3.beyondverbal.com/v3/recording/' + id,
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Length': audioFile.length
    },
    body: audioFile
  };
  return new Promise((resolve, reject) => {
    request.post(options, (err, res, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(body));
      }
    });
  });
}

module.exports = {
  getToken: getToken,
  startSession: startSession,
  analyseData: analyseData
};
