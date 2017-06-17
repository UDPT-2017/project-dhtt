var aboutController = require('../controllers/aboutController');
var categoriesController = require('../controllers/categoriesController');

var configRoutes = function(app){
  app.get('/', function(req, res){
    res.render('home');
  });
  app.get('/about', aboutController.getAbout);
  app.get('/admin', function(req, res){
    res.render('admin/dashboard/dashboard');
  });
  app.get('/admin/categories', categoriesController.index);
  app.post('/admin/categories', categoriesController.create);
  app.delete('/admin/categories/:id', categoriesController.delete);
  app.get('/admin/categories/:id/edit', categoriesController.getCategory);
  app.post('/admin/categories/:id/edit', categoriesController.edit);
  app.get('/admin/categories/:search_string', categoriesController.category_search);
};

module.exports = configRoutes;
