var bodyParser = require('body-parser');
var searchProduct = require('../models/searchProduct');
var validator = require('validator');
var path = require('path');

var searchProductController = {
  index: function(req, res){
    var str = req.params.search_string;
    var message = {};
    if(req.query.type == 'search'){
      searchProduct.search(str, function(result){
        if(result){
          res.render('/home');
        }
        else{
          res.send({searchProduct: ''});
        }
      })
    }
  }
}

module.exports = searchProductController;
