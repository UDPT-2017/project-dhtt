var bodyParser = require('body-parser');
var categories = require('../models/categories');
var validator = require('validator');

var categoriesController = {
  index: function(req, res){
    categories.index(function(categories){
      if(categories.rowCount > 0){
        res.render('admin/categories/index', {categories: categories.rows});
      }
      else{
        res.render('admin/categories/index');
      }
    })
  },
  create: function(req, res){
    var name = req.body.name;
    var description = req.body.description;
    var message = {};
    if(validator.isEmpty(name) || validator.isEmpty(description)){
      message.error = "Name or description cannot blank!";
      res.render('admin/categories/index', {message: message});
    }
    else{
      var category = {};
      category.name = name;
      category.description = description;
      categories.create(category, function(error){
        console.log(error);
        if(error){
          message.error = "Create category failed!";
          res.render('admin/categories/index', {message: message})
        }
        else{
          res.redirect('/admin/categories');
        }
      })
    }
  },
  delete: function(req, res){
    var id = req.params.id;
    var message = {};
    categories.delete(id, function(error){
      if(error){
        message.error = "Delete failed";
        res.render('admin/categories/index', {message: message});
      }
      else{
        categories.index(function(categories){
          if(categories.rowCount > 0){
            res.send({categories: categories.rows});
          }
          else{
            res.render('admin/categories/index');
          }
        })
      }
    })
  },
  getCategory: function(req, res){
    var id = req.params.id;
    var message = {};
    categories.getCategory(id, function(result){
      if(result){
        res.render('admin/categories/edit', {category: result.rows[0]});
      }
      else{
        res.send(404, "Not found");
      }
    })
  },
  edit: function(req, res){
    var id = req.params.id;
    var name = req.body.name;
    var description = req.body.description;
    var message = {};
    if(validator.isEmpty(name)){
      message.error = "Name or description cannot blank!";
      categories.getCategory(id, function(result){
        if(result){
          res.render('admin/categories/edit', {category: result.rows[0], message: message});
        }
        else{
          res.send(404, "Not found");
        }
      })
    }
    else{
      var category = {};
      category.id = id;
      category.name = name;
      category.description = description;
      categories.edit(category, function(error){
        if(error){
          message.error = "Edit category failed!";
          categories.getCategory(id, function(result){
            if(result.rowCount > 0){
              res.render('admin/categories/edit', {category: result.rows[0], message: message});
            }
            else{
              res.send(404, "Not found");
            }
          })
        }
        else{
          res.redirect('/admin/categories');
        }
      })
    }
  },
  category_search: function(req, res){
    var str = req.params.search_string;
    var message = {};
    categories.category_search(str, function(result){
      if(result){
        res.send({categories: result.rows});
      }
      else{
        res.send({categories: ''});
      }
    })
  }
}

module.exports = categoriesController;
