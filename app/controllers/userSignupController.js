var users = require('../models/userSignup.js');
var bodyPaser = require('body-parser');
var passwordHash = require('password-hash');
var merchandise = require('../models/merchandise');
var categories = require('../models/categories');

var userSignupController = {
  signup: function(req, res){
    var url = req.protocol + '://' + req.get('host');
    var user = {};
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = passwordHash.generate(req.body.password);
    user.phone = req.body.phone;

    var message = {};
    if(user.name && user.email && user.password){
      users.signup(user,function(error){
          if(error){
            message.error = error.detail;
            merchandise.home(function(items){
              if(items){
              categories.index(function(categories){
                if(categories){
                  merchandise.bargain(function(bargain){
                    if(bargain){
                      res.render('home', {merchandise: items.rows, categories: categories.rows, bargains: bargain.rows, url: url, user: req.user, message: message});
                    }
                  })

                }
                else{
                  res.render('home', {merchandise: merchandise.rows, categories: '', bargains: ''});
                }
              })
            }
          else{
            res.render('home', {user: req.user, merchandise: '', categories: '', bargains: '', user: req.user});
          }
          })
            res.render('home', {message: message, user: req.user});
          }
          else{
            message.success= "Đăng kí tài khoản thành công";
              merchandise.home(function(items){
              if(items){
              categories.index(function(categories){
                if(categories){
                  merchandise.bargain(function(bargain){
                    if(bargain){
                      res.render('home', {merchandise: items.rows, categories: categories.rows, bargains: bargain.rows, url: url, user: req.user, message: message, user: req.user});
                    }
                  })

                }
                else{
                  res.render('home', {merchandise: merchandise.rows, categories: '', bargains: '',  user: req.user});
                }
              })
            }
          else{
            res.render('home', {user: req.user, merchandise: '', categories: '', bargains: '', user: req.user});
          }
          })
        }
      });
    }
    else{
      message.error = "Name, email, password cannot blank!";
      merchandise.home(function(items){
              if(items){
              categories.index(function(categories){
                if(categories){
                  merchandise.bargain(function(bargain){
                    if(bargain){
                      res.render('home', {merchandise: items.rows, categories: categories.rows, bargains: bargain.rows, url: url, user: req.user, message: message, user: req.user});
                    }
                  })

                }
                else{
                  res.render('home', {merchandise: merchandise.rows, categories: '', bargains: '',  user: req.user, message: message, user: req.user});
                }
              })
            }
          else{
            res.render('home', {user: req.user, merchandise: '', categories: '', bargains: '', message: message, user: req.user});
          }
          })
    }

  }
};
module.exports = userSignupController;
