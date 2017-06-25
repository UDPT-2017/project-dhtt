var pg = require('pg');
var connect = "postgres://postgres:01655869381@localhost:5432/projectUDPT";

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
