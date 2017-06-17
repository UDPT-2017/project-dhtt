var pg = require('pg');
var connect = "postgres://postgres@localhost:5432/projectUDPT";

var categories = {
  index: function(callback){
    pg.connect(connect, function(err, client, done){
        client.query("SELECT row_number() OVER () as rnum, * FROM categories", function(error, result){
          callback(result);
        });
      });
  },
  create: function(category, callback){
    pg.connect(connect, function(err, client, done){
      client.query("INSERT INTO categories(name, description) VALUES($1, $2)", [category.name, category.description], function(error, result){
        callback(error);
      });
    });
  },
  delete: function(id, callback){
    pg.connect(connect, function(err, client, done){
      client.query("DELETE FROM categories WHERE id = $1", [id], function(error, result){
        callback(error);
      });
    });
  },
  getCategory: function(id, callback){
    pg.connect(connect, function(err, client, done){
      client.query("SELECT * FROM categories WHERE id = $1", [id], function(error, result){
        callback(result);
      });
    });
  },
  edit: function(category, callback){
    pg.connect(connect, function(err, client, done){
      client.query("UPDATE categories SET name = $1, description = $2 WHERE id = $3", [category.name, category.description, category.id], function(error, result){
        callback(error);
      });
    });
  },
  category_search: function(str, callback){
    pg.connect(connect, function(err, client, done){
        client.query("SELECT row_number() OVER () as rnum, * FROM categories WHERE name LIKE $1", ['%' + str + '%'], function(error, result){
          callback(result);
        });
      });
  }
}
module.exports = categories;