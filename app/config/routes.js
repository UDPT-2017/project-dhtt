var aboutController = require('../controllers/aboutController');
var categoriesController = require('../controllers/categoriesController');
var usersController = require('../controllers/usersController');
var merchandiseController = require('../controllers/merchandiseController');
var homeController = require('../controllers/homeController');
var multer  = require('multer');
var upload = multer({ dest: 'app/public/uploads/'});

var configRoutes = function(app){
  app.get('/', homeController.index);
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

  app.get('/admin/merchandise', merchandiseController.index);
  app.post('/admin/merchandise', upload.any(), merchandiseController.create);
  app.delete('/admin/merchandise/:id', merchandiseController.delete);
  app.get('/admin/merchandise/:id/edit', merchandiseController.getMerchandise);
  app.post('/admin/merchandise/:id/edit', upload.any(), merchandiseController.edit);
  app.get('/admin/merchandise/:search_string', merchandiseController.merchandise_search);
  app.get('/categories/:id/merchandise', homeController.categories_merchandise);
};

module.exports = configRoutes;
