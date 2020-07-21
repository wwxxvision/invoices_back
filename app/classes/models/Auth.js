const Crypt = require('../system/Crypt');
const jwt = require('jsonwebtoken');
const CONFIG= require('../../config/config');
const BaseModel = require('./BaseModel');
const schema = require('../../schema/authSchema');
require('dotenv').config();

class Auth extends BaseModel {
  constructor() {
    super();
    this.tableName = 'users';
  }

  async authorize(login, password, database) {
    this.setDatabase(database);
    const passwordWithHash = process.env.NODE_ENV === 'production' ? Crypt.hashing(password) :
      '$2b$10$meLNwlVhsJiUVmzzaWZALeUjjMGw3qUkvcFvcEMRtgJlubdSf0PLy';
    const querySearchUser = `* FROM ${this.tableName} WHERE login = '${login}'
      AND  password = '${passwordWithHash}' `;

    return await this.database.select(querySearchUser)
        .then((result) => {
          if (result && result.length) {
            const userIsExist = Boolean(result[0]);

            if (userIsExist) {
              return jwt.sign({
                role: 'admin',
                expiresIn: CONFIG.jwt.exp,
              }, CONFIG.jwt.secret);
            }

            return false;
          } else {
            return false;
          }
        });
  }

  getSchema() {
    return schema;
  }
}

module.exports = new Auth;
