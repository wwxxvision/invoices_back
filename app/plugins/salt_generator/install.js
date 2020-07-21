module.exports = (() => {
  const bcrypt = require('bcrypt');
  const saltRounds = 10;

  return bcrypt.genSaltSync(saltRounds);
})();
