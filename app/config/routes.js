var aboutController = require('../controllers/aboutController');
var categoriesController = require('../controllers/categoriesController');
var usersController = require('../controllers/usersController');

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

  app.get('/admin/users', usersController.index);
  app.delete('/admin/users/:id', usersController.delete);
  app.get('/admin/users/:search_string', usersController.user_search);
};

module.exports = configRoutes;
