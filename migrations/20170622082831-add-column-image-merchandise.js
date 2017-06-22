'use strict';

exports.up = function(db, callback) {
  db.addColumn('merchandise', 'image', { type: 'string' }, callback);
};
