var categories = require('../models/categories');
var aboutController = {
  getAbout: function(req, res){
    var url = req.protocol + '://' + req.get('host');
    categories.index(function(categories){
      if(categories){
        res.render('about', {categories: categories.rows, url: url, user: req.user});
      }
      else{
        res.render('about', {categories: '', url: url, user: req.user});
      }
    })
  }
}

module.exports = aboutController;
