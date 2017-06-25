var pg = require('pg');
var config = require('../config/config.js');
var connect = "postgres://"+config.username+":"+config.password+"@"+config.host+"/"+config.database+"";

var users = {
  index: function(callback){
    pg.connect(connect, function(err, client, done){
        client.query("SELECT row_number() OVER () as rnum, * FROM users WHERE is_admin = false", function(error, result){
          done();
          callback(result);
        });
      });
  },
  delete: function(id, callback){
    pg.connect(connect, function(err, client, done){
        client.query("DELETE FROM users WHERE id = $1", [id], function(error, result){
          done();
          callback(error);
        });
      });
  },
  user_search: function(str, callback){
    pg.connect(connect, function(err, client, done){
        client.query("SELECT row_number() OVER () as rnum, * FROM users WHERE (email LIKE $1) OR (name LIKE $1) ", ['%' + str + '%'], function(error, result){
          done();
          callback(result);
        });
      });
  }
}
module.exports = users;
