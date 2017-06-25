var bodyParser = require('body-parser');
var users = require('../models/users');

var usersController = {
  index: function(req, res){
    if(typeof session == "undefined" || session == null)
    {
      res.redirect('login');
    }
    else {
    users.index(function(users){
      if(users){
        res.render('admin/users/index', {users: users.rows, user: req.user});
      }
      else{
        res.render('admin/users/index', {user: req.user});
      }
    })
  }
  },
  delete: function(req, res){
    var id = req.params.id;
    var message = {};
    users.delete(id, function(error){
      if(error){
        message.error = "Delete failed";
        res.render('admin/users/index', {message: message, user: req.user});
      }
      else{
        users.index(function(users){
          if(users){
            res.send({users: users.rows});
          }
          else{
            res.render('admin/users/index', {user: req.user});
          }
        })
      }
    })
  },
  user_search: function(req, res){
    var str = req.params.search_string;
    var message = {};
    users.user_search(str, function(result){
      if(result){
        res.send({users: result.rows});
      }
      else{
        res.send({users: ''});
      }
    })
  }
}

module.exports = usersController;
