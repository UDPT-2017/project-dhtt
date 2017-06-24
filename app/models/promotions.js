var pg = require('pg');
var connect = "postgres://postgres:yeuladau@localhost:5432/projectUDPT";

var promotions = {
  index: function(callback){
    pg.connect(connect, function(err, client, done){
        client.query("SELECT row_number() OVER () as rnum, m.name as merchandise_name, m.id as merchandise_id, p.* FROM merchandise m join promotions p on p.merchandise_id = m.id ORDER BY p.id DESC", function(error, result){
          callback(result);
        });
      });
  },
  delete: function(id, callback){
    pg.connect(connect, function(err, client, done){
        client.query("DELETE FROM promotions WHERE id = $1", [id], function(error, result){
          callback(error);
        });
      });
  },
  promotions_search: function(str, callback){
    pg.connect(connect, function(err, client, done){
        client.query("SELECT row_number() OVER () as rnum, m.name as merchandise_name, m.id as merchandise_id, p.* FROM merchandise m join promotions p on m.id = p.merchandise_id WHERE (m.name LIKE $1)", ['%' + str + '%'], function(error, result){
          callback(result);
        });
      });
  },
  edit: function(item, callback){
    pg.connect(connect, function(err, client, done){
        client.query("UPDATE promotions SET discount = $1, start_date = $2, end_date = $3, merchandise_id = $4 WHERE id = $5", [item.discount, item.start_date, item.end_date, item.merchandise_id, item.id], function(error, result){
          callback(error);
      });
    });
  },
  getPromotions: function(id, callback){
    pg.connect(connect, function(err, client, done){
      client.query("SELECT m.name as merchandise_name, m.id as merchandise_id, p.* FROM merchandise m join promotions p on m.id = p.merchandise_id WHERE p.id=$1", [id], function(error, result){
        callback(result);
      });
    });
  },
  promotions_filter: function(str, callback){
    pg.connect(connect, function(err, client, done){
        client.query("SELECT row_number() OVER () as rnum,  m.name as merchandise_name, m.id as merchandise_id, p.* FROM promotions p join merchandise m on m.merchandise_id = p.id WHERE p.merchandise_id = $1", [str], function(error, result){
          callback(result);
        });
      });
  },
  create: function(item, callback){
    pg.connect(connect, function(err, client, done){
        client.query("INSERT INTO promotions(discount, start_date, end_date, merchandise_id) VALUES($1, $2, $3, $4) ", [item.discount, item.start_date, item.end_date, item.merchandise_id], function(error, result){
          callback(error);
        });
      });
  },
  home: function(callback){
    pg.connect(connect, function(err, client, done){
        client.query("SELECT row_number() OVER () as rnum, p.*, p.discount FROM merchandise m right join promotions p on p.merchandise_id = m.id ORDER BY p.id DESC", function(error, result){
          callback(result);
        });
      });
  },
  bargain: function(callback){
    pg.connect(connect, function(err, client, done){
        client.query("SELECT row_number() OVER () as rnum, p.*, p.discount FROM merchandise m join promotions p on p.merchandise_id = m.id ORDER BY p.id DESC", function(error, result){
          callback(result);
        });
      });
  },
  showPromotions: function(id, date, callback){
    pg.connect(connect, function(err, client, done){
      client.query("SELECT * FROM promotions WHERE date between start_date AND end_date WHERE merchandise_id = $1",[id], function(promotion, err){
        if(promotion.rowCount > 0){
          client.query("SELECT p.*, m.price - m.price * p.discount AS discount FROM promotions p right join merchandise m on m.id = p.merchandise_id WHERE m.id = $1 and p.start_date >= $2 AND p.end_date <= $2", [id, date], function(error, result){
            callback(result);
          });
        }
        else{
          client.query("SELECT p.* FROM promotions p WHERE p.id = $1", [id], function(error, result){
            callback(result);
          });
        }
      })
      });
  }
}
module.exports = promotions;
