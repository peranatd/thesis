const sql = require('mysql');

let params;
if (process.env.RDS_HOSTNAME) {
  params = {
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
    database : 'speakmirror'
  };
} else {
  params = {
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'speakmirror',
    // socketPath: '/opt/local/var/run/mysql57/mysqld.sock'
  };
}

const db = sql.createConnection(params);
db.connect();

module.exports = db;
