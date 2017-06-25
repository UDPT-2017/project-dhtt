'use strict';

exports.up = function (db) {
  return db.createTable('promotions', {
    id: {
      type: 'int',
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
   discount: {
      allowNull: false,
      type: 'decimal'
    },
    start_date: {
      allowNull: false,
      type: 'datetime'
    },
    end_date: {
      allowNull: false,
      type: 'datetime'
    },
    merchandise_id: {
      allowNull: false,
      type: 'int',
      foreignKey: {
          name: 'fk_merchandise_promotions',
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
  return db.dropTable('promotions');
};
