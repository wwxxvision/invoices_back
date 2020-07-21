'use strict';
const bcrypt = require('bcrypt');
let dbm;
let type;
let seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  const passHash = bcrypt.hashSync('admin', '$2b$10$meLNwlVhsJiUVmzzaWZALe');
  return db.insert('users', ['login', 'password'], ['admin', passHash]);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  'version': 2,
};
