var pg = require('pg');
var connect = "postgres://postgres:01655869381@localhost:5432/projectUDPT";

var userSignup = {
  signup: function(user, callback){
    try{
      pg.connect(connect, function(err, client, done){
        client.query("INSERT INTO users(name, email, password, phone) VALUES ($1, $2, $3, $4)",
          [user.name, user.email, user.password, user.phone], function(error, result){
            callback(error);
          });
        });
    }catch(error)
    {
      callback(error);
    }
  }
}
module.exports = userSignup;
