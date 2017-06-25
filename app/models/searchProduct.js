var pg = require('pg');
var config = require('../config/config.js');
var connect = "postgres://"+config.username+":"+config.password+"@"+config.host+"/"+config.database+"";

var searchProduct = { 
  search: function(str, callback){
    pg.connect(connect, function(err, client, done){
        client.query("SELECT row_number() OVER () as rnum,  m.* FROM merchandise m WHERE (m.name LIKE $1)", ['%' + str + '%'], function(error, result){
          done();
          callback(result);
        });
      })
  }
}
module.exports = searchProduct;
