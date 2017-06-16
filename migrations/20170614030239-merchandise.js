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
    price: {
      allowNull: false,
      type: 'decimal'
    },
    description: {
      allowNull: false,
      type: 'string'
    },
    category_id: {
      allowNull: false,
      type: 'int',
      foreignKey: {
          name: 'fk_merchandise_categories',
          table: 'categories',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          },
          mapping: 'id'
        }
    }
  });
};

exports.down = function (db) {
  return db.dropTable('users-test');
};
