var pg = require('pg');
var connect = "postgres://postgres@localhost:5432/projectUDPT";

var merchandise = {
  index: function(callback){
    pg.connect(connect, function(err, client, done){
        client.query("SELECT row_number() OVER () as rnum, c.name as category_name, c.id as category_id, m.* FROM categories c join merchandise m on m.category_id = c.id", function(error, result){
          callback(result);
        });
      });
  },
  delete: function(id, callback){
    pg.connect(connect, function(err, client, done){
        client.query("DELETE FROM merchandise WHERE id = $1", [id], function(error, result){
          callback(error);
        });
      });
  },
  merchandise_search: function(str, callback){
    pg.connect(connect, function(err, client, done){
        client.query("SELECT row_number() OVER () as rnum, c.name as category_name, c.id as category_id, m.* FROM categories c join merchandise m on m.category_id = c.id WHERE (m.name LIKE $1)", ['%' + str + '%'], function(error, result){
          callback(result);
        });
      });
  },
  edit: function(item, callback){
    pg.connect(connect, function(err, client, done){
      if(item.image){
        client.query("UPDATE merchandise SET name = $1, description = $2, price = $3, category_id = $4, image = $6 WHERE id = $5", [item.name, item.description, item.price, item.category_id, item.id, item.image], function(error, result){
          callback(error);
        });
      }
      else{
        client.query("UPDATE merchandise SET name = $1, description = $2, price = $3, category_id = $4 WHERE id = $5", [item.name, item.description, item.price, item.category_id, item.id], function(error, result){
          callback(error);
      });
      }

    });
  },
  getMerchandise: function(id, callback){
    pg.connect(connect, function(err, client, done){
      client.query("SELECT c.name as category_name, c.id as category_id, m.* FROM categories c join merchandise m on m.category_id = c.id WHERE m.id = $1", [id], function(error, result){
        callback(result);
      });
    });
  },
  merchandise_filter: function(str, callback){
    pg.connect(connect, function(err, client, done){
        client.query("SELECT row_number() OVER () as rnum, c.name as category_name, c.id as category_id, m.* FROM categories c join merchandise m on m.category_id = c.id WHERE m.category_id = $1", [str], function(error, result){
          callback(result);
        });
      });
  },
  create: function(item, callback){
    pg.connect(connect, function(err, client, done){
        client.query("INSERT INTO merchandise(name, description, price, category_id, image) VALUES($1, $2, $3, $4, $5) ", [item.name, item.description, item.price, item.category_id, item.image], function(error, result){
          callback(error);
        });
      });
  }
}
module.exports = merchandise;
