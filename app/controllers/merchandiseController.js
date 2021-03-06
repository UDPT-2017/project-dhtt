var bodyParser = require('body-parser');
var merchandise = require('../models/merchandise');
var categories = require('../models/categories');
var validator = require('validator');
var path = require('path');

var merchandiseController = {
  index: function(req, res){
    if(typeof session == "undefined" || session == null)
    {
      res.redirect('login');
    }
    else {
    merchandise.index(function(items){
      if(items){
        categories.index(function(categories){
          if(categories){
            res.render('admin/merchandise/index', {merchandise: items.rows, categories: categories.rows, user: req.user});
          }
          else{
            res.render('admin/merchandise/index', {merchandise: merchandise.rows, user: req.user});
          }
        })
      }
      else{
        res.render('admin/merchandise/index', {user: req.user});
      }
    })
  }
  },
  delete: function(req, res){
    var id = req.params.id;
    var message = {};
    merchandise.delete(id, function(error){
      if(error){
        message.error = "Delete failed";
        res.render('admin/merchandise/index', {message: message, user: req.user});
      }
      else{
        merchandise.index(function(items){
          if(merchandise){
            res.send({merchandise: items.rows});
          }
          else{
            res.render('admin/merchandise/index', {user: req.user});
          }
        })
      }
    })
  },
  merchandise_search: function(req, res){
    var str = req.params.search_string;
    var message = {};
    if(req.query.type == 'search'){
      merchandise.merchandise_search(str, function(result){
        if(result){
          res.send({merchandise: result.rows});
        }
        else{
          res.send({merchandise: ''});
        }
      })
    }
    else{
      if(str == '0'){
        merchandise.index(function(result){
          if(result){
            categories.index(function(categories){
              if(categories){
                res.send({merchandise: result.rows, categories: categories.rows});
              }
              else{
                res.send({merchandise: result.rows, categories: ''});
              }
            })
          }
          else{
            res.send({merchandise: '', categories: ''});
          }
        })
      }
      else{
        merchandise.merchandise_filter(str, function(result){
        if(result){
          categories.index(function(categories){
            if(categories){
              res.send({merchandise: result.rows, categories: categories.rows});
            }
          })
        }
        else{
          res.send({merchandise: '', categories: ''});
        }
      })
      }
    }
  },
  create: function(req, res){
    var item = {};
    item.name = req.body.name;
    item.description = req.body.description;
    item.price = req.body.price;
    item.category_id = req.body.cate_id;
    console.log(item.category_id);
    if(typeof req.files != "undefined"){
      item.image = req.files[0].filename;
    }
    var message = {};
    if(validator.isEmpty(item.name) || validator.isEmpty(item.description)){
      message.error = "Name or description cannot blank!";
      res.render('admin/merchandise/index', {message: message, user: req.user});
    }
    else{
      if(!validator.isDecimal(item.price)){
        message.error = "Price must be a numberic";
        res.render('admin/merchandise/index', {message: message, user: req.user});
      }
      else{
        merchandise.create(item, function(error){
          if(error){
            message.error = "Create merchandise failed!";
            res.render('admin/merchandise/index', {message: message, user: req.user})
          }
          else{
            res.redirect('/admin/merchandise');
          }
        })
      }
    }
  },
  getMerchandise: function(req, res){
    var id = req.params.id;
    var message = {};
    merchandise.getMerchandise(id, function(items){
      if(items){
        categories.index(function(cate){
          if(cate){
            res.render('admin/merchandise/edit', {merchandise: items.rows[0], categories: cate.rows, user: req.user});
          }
          else{
            res.render('admin/merchandise/edit', {merchandise: items.rows[0], user: req.user});
          }
        })
      }
      else{

      }
    })
  },
  edit: function(req, res){
    var item = {};
    item.id = req.params.id;
    item.name = req.body.name;
    item.description = req.body.description;
    item.price = req.body.price;
    item.category_id = req.body.category_id;
    if(req.files[0]){
      item.image = req.files[0].filename;
    }
    var message = {};
    if(validator.isEmpty(item.name) || validator.isEmpty(item.description)){
      message.error = "Name or description cannot blank!";
      categories.index(function(categories){
          if(categories){
            res.render('admin/merchandise/edit', {message: message, categories: categories.rows, merchandise: item, user: req.user});
          }
        })
    }
    else{
      if(!validator.isDecimal(item.price)){
        message.error = "Price must be a numberic";
        categories.index(function(categories){
          if(categories){
            res.render('admin/merchandise/edit', {message: message, categories: categories.rows, merchandise: item, user: req.user});
          }
        })
      }
      else{
        merchandise.edit(item, function(error){
          if(error){
            message.error = "Edit merchandise failed!";
            console.log(error);
            categories.index(function(categories){
            if(categories){
              res.render('admin/merchandise/edit', {message: message, categories: categories.rows, merchandise: item, user: req.user});
            }
        })
          }
          else{
            res.redirect('/admin/merchandise');
          }
        })
      }
    }
  },
  showMerchandise: function(req, res){
    var id = req.params.id;
    var url = req.protocol + '://' + req.get('host');
    var date = new Date();
    var message = {};
    merchandise.showMerchandise(id, date, function(items){
      if(items){
        categories.index(function(cate){
          if(cate){
            res.render('merchandise/show', {merchandise: items.rows[0], categories: cate.rows, url: url, user: req.user});
          }
          else{
            res.render('merchandise/show', {merchandise: items.rows[0], categories: '', url: url, user: req.user});
          }
        })
      }
      else{
        res.send(404, 'Not found');
      }
    })
  }
}

module.exports = merchandiseController;
