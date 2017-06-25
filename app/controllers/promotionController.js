var bodyParser = require('body-parser');
var merchandise = require('../models/merchandise');
var promotions = require('../models/promotions');
var validator = require('validator');
var path = require('path');
var dateformat = require('dateformat');

var promotionController = {
  index: function(req, res){
    if(typeof session == "undefined" || session == null)
    {
      res.redirect('login');
    }
    else {
    promotions.index(function(items){
      if(items){
        merchandise.index(function(merchandise){
          if(merchandise){
            res.render('admin/promotions/index', {promotions: items.rows, merchandise: merchandise.rows, user: req.user});
          }
          else{
            res.render('admin/promotions/index', {promotions: promotions.rows, user: req.user});
          }
        })
      }
      else{
        res.render('admin/promotions/index', {user: req.user});
      }
    })
  }
  },
  delete: function(req, res){
    var id = req.params.id;
    var message = {};
    promotions.delete(id, function(error){
      if(error){
        message.error = "Delete failed";
        res.render('admin/promotions/index', {message: message, user: req.user});
      }
      else{
        promotions.index(function(items){
          if(items){
            res.send({promotions: items.rows});
          }
          else{
            res.render('admin/promotions/index', {user: req.user});
          }
        })
      }
    })
  },
  promotions_search: function(req, res){
    var str = req.params.search_string;
    var message = {};
    if(req.query.type == 'search'){
      promotions.promotions_search(str, function(result){
        if(result){
          res.send({promotions: result.rows});
        }
        else{
          res.send({promotions: ''});
        }
      })
    }
    else{
      if(str == '0'){
        promotions.index(function(result){
          if(result){
            promotions.index(function(categories){
              if(promotions){
                res.send({promotions: result.rows, merchandise:  merchandise.rows});
              }
              else{
                res.send({promotions: result.rows,  merchandise: ''});
              }
            })
          }
          else{
            res.send({promotions: '', merchandise: ''});
          }
        })
      }
      else{
        promotions.promotions_search(str, function(result){
        if(result){
          merchandise.index(function(categories){
            if(merchandise){
              res.send({promotions: result.rows, merchandise: merchandise.rows});
            }
          })
        }
        else{
          res.send({promotions: '', merchandise: ''});
        }
      })
      }
    }
  },
  create: function(req, res){
    var item = {};
    item.discount = req.body.discount;
    item.start_date = req.body.start_date;
    item.end_date = req.body.end_date;
    item.merchandise_id = req.body.merchandise_id;

    var message = {};
    if(validator.isEmpty(item.discount)){
      message.error = "Discount cannot blank!";
      res.render('admin/promotions/index', {message: message, user: req.user});
    }
    else{


      
        promotions.create(item, function(error){
          if(error){
            message.error = "Create promotions failed!";
            res.render('admin/promotions/index', {message: message, user: req.user})
          }
          else{
            res.redirect('/admin/promotions');
          }
        })
      
    }
  },
  getPromotions: function(req, res){
    var id = req.params.id;
    var message = {};
    promotions.getPromotions(id, function(items){
      if(items){
        merchandise.index(function(cate){
          if(cate){
            res.render('admin/promotions/edit', {promotions: items.rows[0], merchandise: cate.rows, user: req.user});
          }
          else{
            res.render('admin/promotions/edit', {promotions: items.rows[0], user: req.user});
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
    item.discount = req.body.discount;
    item.start_date = dateformat(req.body.start_date, "yyyy-mm-dd");
    item.end_date = dateformat(req.body.end_date, "yyyy-mm-dd");
    item.merchandise_id = req.body.merchandise_id;

    var message = {};
    if(validator.isEmpty(item.discount)){
      message.error = "Discount cannot blank!";
      merchandise.index(function(merchandise){
          if(merchandise){
            res.render('admin/promotions/edit', {message: message, merchandise: merchandise.rows, promotions: item, user: req.user});
          }
        })
    }
    else{
        promotions.edit(item, function(error){
          if(error){
            message.error = "Edit promotions failed!";
            console.log(error);
            merchandise.index(function(merchandise){
            if(merchandise){
              res.render('admin/promotions/edit', {message: message, merchandise: merchandise.rows, promotions: item, user: req.user});
            }
        })
          }
          else{
            res.redirect('/admin/promotions');
          }
        })
      
    }
  },
}

module.exports = promotionController;
