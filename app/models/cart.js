var pg = require('pg');
var config = require('../config/config');
var connect = "postgres://"+config.username+":"+config.password+"@"+config.host+"/"+config.database+"";

var cart = {
  index: function(items, callback){
    pg.connect(connect, function(err, client, done){
        client.query("SELECT row_number() OVER () as rnum, * FROM merchandise WHERE id = ANY($1::int[])", [items], function(error, result){
          done();
          callback(result);
        });
      });
  },
  add: function(items, callback){
    pg.connect(connect, function(err, client, done){
        client.query("SELECT row_number() OVER () as rnum, * FROM merchandise WHERE id = $1", [items], function(error, result){
          done();
          callback(result);
        });
      });
  }

}
module.exports = cart;
