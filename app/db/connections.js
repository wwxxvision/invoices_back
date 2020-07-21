require('dotenv').config();
const mysql = require('mysql');


module.exports = (() => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  connection.connect(function(err) {
    if (err) {
      global.logger.error('Failed connection to Database: ' + err);
    }

    global.logger.info('Succsess connection to Database');
  });

  return connection;
})();
