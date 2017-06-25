var bodyParser = require('body-parser');
var passwordHash = require('password-hash');
var users = require('../models/userSignup');
var merchandise = require('../models/merchandise');
var categories = require('../models/categories');

var sessionsController = {
  login: function(req, res){
    var email = req.body.email;
    var pass = req.body.password;
    var message = {};
    session = req.session;

    var user = users.findOneUser(email,function(result){
        if(result.rowCount == 1){
          var kq = passwordHash.verify(pass, result.rows[0].password);

          if(kq == true)
          {
            message.success = "Login successfully!";
            session.user = result.rows[0];
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
          }
          else
          {
            message.error = "Invalid password!";
           res.render('sessions/new', {message: message});
          }
        }
        else{
          message.error = "Invalid email";
          res.render('sessions/new', {message: message});
        }
    });
  },
  logout: function(req, res){
    message = {};
    session = null;
    message.success = "Log out successfully!";
    res.redirect('/');
  }
}

module.exports = sessionsController;
