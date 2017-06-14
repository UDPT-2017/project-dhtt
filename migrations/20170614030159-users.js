'use strict';

exports.up = function (db) {
  return db.createTable('users-test', {
    id: {
      type: 'int',
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      allowNull: false,
      type: 'string'
    },
    email: {
      allowNull: false,
      type: 'string'
    },
    password: {
      allowNull: false,
      type: 'string'
    },
    phone: {
      allowNull: false,
      type: 'string'
    },
    provider: {
      allowNull: false,
      type: 'string'
    },
    is_admin: {
      allowNull: false,
      type: 'boolean',
      default: false
    },
    address: {
      allowNull: false,
      type: 'string'
    }
  });
};

exports.down = function (db) {
  return db.dropTable('users-test');
};
