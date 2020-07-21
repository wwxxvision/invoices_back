const log4js = require('log4js');
const CONFIG = require('../config/config');

module.exports = (() => {
  // logger
  log4js.configure({
    appenders: CONFIG.logger,
    categories: {default: {appenders: ['appLogger'], level: 'info'}},
  });
  global.logger = log4js.getLogger();
  // colors
  global.colors = require('colors/safe');
  global.Log = require('./custom_log/index');
  // set salt - its demo
  // CONFIG.salt = require('./salt_generator/install');
})();
