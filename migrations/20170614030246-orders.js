'use strict';

exports.up = function (db) {
  return db.createTable('users-test', {
    id: {
      type: 'int',
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    order_date: {
      allowNull: false,
      type: 'datetime'
    },
    total_amount: {
      allowNull: false,
      type: 'decimal',
      default: 0
    },
    user_id: {
      allowNull: false,
      type: 'decimal',
      foreignKey: {
          name: 'fk_users_orders',
          table: 'users',
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
