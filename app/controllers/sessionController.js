var bodyParser = require('body-parser');
var cart = require('../models/cart');
var categories = require('../models/categories');

var sessionController = {
  addItem: function(req, res){
    var id = req.params.id;
    session = req.session;
    item = {};
    item.id = id;
    item.quantity = 1;
    if(session.item){
      var length = session.item.length;
      session.item[length] = item;
    }
    else{
      session.item = [];
      session.item[0] = item;
    }
    res.status(200).send('Success');
  },
  showItemCart: function(req, res){
    var url = req.protocol + '://' + req.get('host');
    session = req.session;
    if(session.item){
      var i = 0;
      var production = [];
      for(i=0; i < session.item.length; i++){
        production[i] = parseInt(session.item[i].id);
      }
      cart.index(production, function(result){
        if(result){
          categories.index(function(categories){
            if(categories){
              var i=0;
              session.total = 0;
              for(i = 0; i< result.rowCount; i++){
                session.item[i].price = result.rows[i].price;
                session.item[i].name = result.rows[i].name;
                session.total += parseInt(result.rows[i].price);
              }
              res.render('cart/checkout', {production: result.rows, categories: categories.rows, url: url});
            }
            else{
              res.render('cart/checkout', {production: result.rows, categories: '', url: url});
            }
          })
        }
        else{
          res.send(404, 'Not found');
        }
      })
    }
    else{
      res.render('cart/checkout', {production: '', categories: '', url: url});
    }
  },
  changePlus: function(req, res){

    var id = parseInt(req.params.id) - 1;
    session = req.session;
    session.total = parseInt(session.total) + parseInt(session.total)/parseInt(session.item[id].quantity);
    session.item[id].quantity += 1;
    res.status(200).send({items: session.item, total: session.total});
  },
  changeMinus: function(req, res){
    var url = req.protocol + '://' + req.get('host');
    var id = parseInt(req.params.id) - 1;
    session = req.session;
    session.total = parseInt(session.total) - parseInt(session.total)/parseInt(session.item[id].quantity);
    session.item[id].quantity -= 1;
    res.status(200).send({items: session.item, total: session.total, url: url});
  }
}

module.exports = sessionController;
