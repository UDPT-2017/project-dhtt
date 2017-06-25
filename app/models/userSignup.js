var pg = require('pg');
var config = require('../config/config.js');
var connect = "postgres://"+config.username+":"+config.password+"@"+config.host+"/"+config.database+"";

var userSignup = {
  signup: function(user, callback){
    try{
      pg.connect(connect, function(err, client, done){
        client.query("INSERT INTO users(name, email, password, phone) VALUES ($1, $2, $3, $4)",
          [user.name, user.email, user.password, user.phone], function(error, result){
            done();
            callback(error);
          });
        });
    }catch(error)
    {
      done();
      callback(error);
    }
  },
  findOneUser: function(email, callback){
    pg.connect(connect, function(err, client, done){
      client.query("SELECT * FROM users WHERE email = $1", [email], function(error, result){
        done();
        callback(result);
      });
    })
  }
}
module.exports = userSignup;
