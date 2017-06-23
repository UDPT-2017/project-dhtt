var bodyParser = require('body-parser');
var merchandise = require('../models/merchandise');
var categories = require('../models/categories');

var homeController = {
  index: function(req, res){
    var url = req.protocol + '://' + req.get('host');
    merchandise.home(function(items){
      if(items){
        categories.index(function(categories){
          if(categories){
            merchandise.bargain(function(bargain){
              if(bargain){
                res.render('home', {merchandise: items.rows, categories: categories.rows, bargains: bargain.rows, url: url, user: req.user});
              }
            })

          }
          else{
            res.render('home', {merchandise: merchandise.rows, categories: '', bargains: '',  user: req.user});
          }
        })
      }
      else{
        res.render('home', {user: req.user});
      }
    })
  },
  categories_merchandise: function(req, res){
    var url = req.protocol + '://' + req.get('host');
    var id = req.params.id;
    merchandise.merchandise_filter(id, function(items){
      if(items){
        categories.index(function(categories){
          if(categories){
            res.render('merchandise/merchandise_category', {merchandise: items.rows, categories: categories.rows, url: url, user: req.user});
          }
          else{
            res.render('home', {merchandise: merchandise.rows, categories: '', url: url, user: req.user});
          }
        })
      }
    })
  }
}

module.exports = homeController;
