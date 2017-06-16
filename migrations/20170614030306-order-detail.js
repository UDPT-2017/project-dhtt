'use strict';

exports.up = function (db) {
  return db.createTable('order_detail', {
    id: {
      type: 'int',
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    unit_price: {
      allowNull: false,
      type: 'decimal'
    },
    quantities: {
      allowNull: false,
      type: 'int'
    },
    amount: {
      allowNull: false,
      type: 'decimal'
    },
    discount: {
      allowNull: false,
      type: 'decimal'
    },
    order_id: {
      allowNull: false,
      type: 'int',
      foreignKey: {
          name: 'fk_orders_order_detail',
          table: 'orders',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          },
          mapping: 'id'
        }
    },
    merchandise_id: {
      allowNull: false,
      type: 'int',
      foreignKey: {
          name: 'fk_merchandise_order_detail',
          table: 'merchandise',
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
