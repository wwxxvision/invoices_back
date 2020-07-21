const bcrypt = require('bcrypt');
const CONFIG = require('../../config/config');

class Crypt {
  hashing(string) {
    return bcrypt.hashSync(string, CONFIG.salt);
  }
}

module.exports = new Crypt;
