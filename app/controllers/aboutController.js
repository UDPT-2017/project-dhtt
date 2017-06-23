var categories = require('../models/categories');
var aboutController = {
  getAbout: function(req, res){
    var url = req.protocol + '://' + req.get('host');
    categories.index(function(categories){
      if(categories){
        res.render('about', {categories: categories.rows, url: url});
      }
      else{
        res.render('about', {categories: '', url: url});
      }
    })
  }
}

module.exports = aboutController;
