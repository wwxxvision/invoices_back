'use strict';

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

exports.up = function(db, callback) {
  return Promise.all([
    db.createTable('clients', {
      id: {type: 'int', primaryKey: true, unsigned: true, notNull: true,
        autoIncrement: true},
      name: 'string',
      address: 'string',
      dateCreated: 'string',
    }),

    db.createTable('invoices', {
      id: {type: 'int', primaryKey: true, autoIncrement: true},
      name: 'string',
      clientID: 'int',
      dateCreated: 'string',
    }),

    db.createTable('services', {
      id: {type: 'int', primaryKey: true, autoIncrement: true},
      description: 'string',
      count: 'int',
      price: {type: 'decimal', precision: 60, scale: 2},
      invoiceID: 'int',
    }),

    db.createTable('users', {
      id: {type: 'int', primaryKey: true, autoIncrement: true},
      login: 'string',
      password: 'string',
    }),
  ])
      .then((res) => console.log(res))
      .finally(() => callback());
};

exports.down = function(db) {
  db.dropTable('clients');
  db.dropTable('invoices');
  db.dropTable('services');
};

exports._meta = {
  'version': 1,
};
