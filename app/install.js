const DatabaseManager = require('./classes/system/DatabaseManager');
const initAppMiddlewares = require('./middlewares/index');
const router = require('./router/index');

module.exports = ((app) => {
  require('./plugins/index');
  initAppMiddlewares(app);
  router(app, new DatabaseManager(require('./db/connections')));
});
