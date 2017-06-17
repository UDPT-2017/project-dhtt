var bodyParser = require('body-parser');
var users = require('../models/users');

var usersController = {
  index: function(req, res){
    users.index(function(users){
      if(users){
        res.render('admin/users/index', {users: users.rows});
      }
      else{
        res.render('admin/users/index');
      }
    })
  },
  delete: function(req, res){
    var id = req.params.id;
    var message = {};
    users.delete(id, function(error){
      if(error){
        message.error = "Delete failed";
        res.render('admin/users/index', {message: message});
      }
      else{
        users.index(function(users){
          if(users){
            res.send({users: users.rows});
          }
          else{
            res.render('admin/users/index');
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
