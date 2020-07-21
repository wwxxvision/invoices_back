const bodyParser = require('body-parser');
const cors = require('cors');
const CONFIG = require('../config/config');

function initAppMiddlewares(app, database) {
  app
      .use(bodyParser.json())
      .use(cors(CONFIG.cors));
}

module.exports = initAppMiddlewares;
