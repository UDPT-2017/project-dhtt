'use strict';

exports.up = function (db) {
  return db.createTable('categories', {
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
    description: {
      allowNull: false,
      type: 'string'
    }
  });
};

exports.down = function (db) {
  return db.dropTable('categories');
};
