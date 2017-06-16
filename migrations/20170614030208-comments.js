'use strict';

exports.up = function (db) {
  return db.createTable('comments', {
    id: {
      type: 'int',
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    content: {
      allowNull: false,
      type: 'string'
    },
    user_id: {
      allowNull: false,
      type: 'int',
      foreignKey: {
          name: 'fk_users_comments',
          table: 'users',
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
          name: 'fk_merchandise_comments',
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
  return db.dropTable('comments');
};
