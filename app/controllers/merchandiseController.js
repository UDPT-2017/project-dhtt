var bodyParser = require('body-parser');
var merchandise = require('../models/merchandise');
var categories = require('../models/categories');
var validator = require('validator');
var path = require('path');

var merchandiseController = {
  index: function(req, res){
    merchandise.index(function(items){
      if(items){
        categories.index(function(categories){
          if(categories){
            res.render('admin/merchandise/index', {merchandise: items.rows, categories: categories.rows});
          }
          else{
            res.render('admin/merchandise/index', {merchandise: merchandise.rows});
          }
        })
      }
      else{
        res.render('admin/merchandise/index');
      }
    })
  },
  delete: function(req, res){
    var id = req.params.id;
    var message = {};
    merchandise.delete(id, function(error){
      if(error){
        message.error = "Delete failed";
        res.render('admin/merchandise/index', {message: message});
      }
      else{
        merchandise.index(function(items){
          if(merchandise){
            res.send({merchandise: items.rows});
          }
          else{
            res.render('admin/merchandise/index');
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
    console.log(req.files);
    if(req.files){
      item.image = req.files[0].filename;
    }
    var message = {};
    if(validator.isEmpty(item.name) || validator.isEmpty(item.description)){
      message.error = "Name or description cannot blank!";
      res.render('admin/merchandise/index', {message: message});
    }
    else{
      if(!validator.isDecimal(item.price)){
        message.error = "Price must be a numberic";
        res.render('admin/merchandise/index', {message: message});
      }
      else{
        merchandise.create(item, function(error){
          if(error){
            message.error = "Create merchandise failed!";
            res.render('admin/merchandise/index', {message: message})
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
            res.render('admin/merchandise/edit', {merchandise: items.rows[0], categories: cate.rows});
          }
          else{
            res.render('admin/merchandise/edit', {merchandise: items.rows[0]});
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
            res.render('admin/merchandise/edit', {message: message, categories: categories.rows, merchandise: item});
          }
        })
    }
    else{
      if(!validator.isDecimal(item.price)){
        message.error = "Price must be a numberic";
        categories.index(function(categories){
          if(categories){
            res.render('admin/merchandise/edit', {message: message, categories: categories.rows, merchandise: item});
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
              res.render('admin/merchandise/edit', {message: message, categories: categories.rows, merchandise: item});
            }
        })
          }
          else{
            res.redirect('/admin/merchandise');
          }
        })
      }
    }
  }
}

module.exports = merchandiseController;
