var pg = require('pg');
var connect = "postgres://postgres@localhost:5432/projectUDPT";

var merchandise = {
  index: function(callback){
    pg.connect(connect, function(err, client, done){
        client.query("SELECT row_number() OVER () as rnum, c.name as category_name, c.id as category_id, m.* FROM categories c join merchandise m on m.category_id = c.id ORDER BY m.id DESC", function(error, result){
          done();
          callback(result);
        });
      });
  },
  delete: function(id, callback){
    pg.connect(connect, function(err, client, done){
        client.query("DELETE FROM merchandise WHERE id = $1", [id], function(error, result){
          done();
          callback(error);
        });
      });
  },
  merchandise_search: function(str, callback){
    pg.connect(connect, function(err, client, done){
        client.query("SELECT row_number() OVER () as rnum, c.name as category_name, c.id as category_id, m.* FROM categories c join merchandise m on m.category_id = c.id WHERE (m.name LIKE $1)", ['%' + str + '%'], function(error, result){
          done();
          callback(result);
        });
      });
  },
  edit: function(item, callback){
    pg.connect(connect, function(err, client, done){
      if(item.image){
        client.query("UPDATE merchandise SET name = $1, description = $2, price = $3, category_id = $4, image = $6 WHERE id = $5", [item.name, item.description, item.price, item.category_id, item.id, item.image], function(error, result){
          done();
          callback(error);
        });
      }
      else{
        client.query("UPDATE merchandise SET name = $1, description = $2, price = $3, category_id = $4 WHERE id = $5", [item.name, item.description, item.price, item.category_id, item.id], function(error, result){
          done();
          callback(error);
      });
      }

    });
  },
  getMerchandise: function(id, callback){
    pg.connect(connect, function(err, client, done){
      client.query("SELECT c.name as category_name, c.id as category_id, m.* FROM categories c join merchandise m on m.category_id = c.id WHERE m.id = $1", [id], function(error, result){
        done();
        callback(result);
      });
    });
  },
  merchandise_filter: function(str, callback){
    pg.connect(connect, function(err, client, done){
        client.query("SELECT row_number() OVER () as rnum, c.name as category_name, c.id as category_id, m.* FROM categories c join merchandise m on m.category_id = c.id WHERE m.category_id = $1", [str], function(error, result){
          done();
          callback(result);
        });
      });
  },
  create: function(item, callback){
    pg.connect(connect, function(err, client, done){
        client.query("INSERT INTO merchandise(name, description, price, category_id, image) VALUES($1, $2, $3, $4, $5) ", [item.name, item.description, item.price, item.category_id, item.image], function(error, result){
          done();
          callback(error);
        });
      });
  },
  home: function(callback){
    pg.connect(connect, function(err, client, done){
        client.query("SELECT row_number() OVER () as rnum, m.*, m.price FROM merchandise m left join promotions p on p.merchandise_id = m.id ORDER BY m.id DESC", function(error, result){
          done();
          callback(result);
        });
      });
  },
  bargain: function(callback){
    pg.connect(connect, function(err, client, done){
        client.query("SELECT row_number() OVER () as rnum, m.*, m.price FROM merchandise m join promotions p on p.merchandise_id = m.id ORDER BY m.id DESC", function(error, result){
          done();
          callback(result);
        });
      });
  },
  showMerchandise: function(id, date, callback){
    pg.connect(connect, function(err, client, done){
      client.query("SELECT * FROM promotions WHERE date between start_date AND end_date WHERE category_id = $1",[id], function(promotion, err){
        if(promotion.rowCount > 0){
          client.query("SELECT m.*, m.price - m.price * p.discount AS discount FROM promotions p right join merchandise m on m.id = p.merchandise_id WHERE m.id = $1 and p.start_date >= $2 AND p.end_date <= $2", [id, date], function(error, result){
            done();
            callback(result);
          });
        }
        else{
          client.query("SELECT m.* FROM merchandise m WHERE m.id = $1", [id], function(error, result){
            done();
            callback(result);
          });
        }
      })
      });
  }
}
module.exports = merchandise;
