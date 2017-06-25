var aboutController = require('../controllers/aboutController');
var categoriesController = require('../controllers/categoriesController');
var usersController = require('../controllers/usersController');
var merchandiseController = require('../controllers/merchandiseController');
var homeController = require('../controllers/homeController');
var promotionsController = require('../controllers/promotionController');
var userSignupController = require('../controllers/userSignupController');
var sessionsController = require('../controllers/sessionsController');
var loginAdminControler = require('../controllers/loginAdminController');
var multer  = require('multer');
var upload = multer({ dest: 'app/public/uploads/'});
var sessionController = require('../controllers/sessionController');

var configRoutes = function(app){
  app.get('/', homeController.index);
  app.get('/about', aboutController.getAbout);
  app.get('/admin', function(req, res){
    res.render('admin/login/index');
  });
  app.get('/admin/login', function(req, res){
    res.render('admin/login/index');
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
  app.get('/merchandise/:id', merchandiseController.showMerchandise);
  app.get('/addToCart/:id', sessionController.addItem);
  app.get('/cart', sessionController.showItemCart);
  app.get('/cart/plus/:id', sessionController.changePlus);
  app.get('/cart/minus/:id', sessionController.changeMinus);

  app.get('/admin/promotions', promotionsController.index);
  app.post('/admin/promotions', promotionsController.create);
  app.delete('/admin/promotions/:id', promotionsController.delete);
  app.get('/admin/promotions/:id/edit', promotionsController.getPromotions);
  app.post('/admin/promotions/:id/edit', promotionsController.edit);
  app.get('/admin/promotions/:search_string', promotionsController.promotions_search);

  app.get('/signup', function(req, res){
    res.render('signup');
  });
  app.post('/signup', userSignupController.signup);

  app.post('/login', sessionsController.login);
  app.post('/admin/login', loginAdminControler.login);
  app.get('/logout', sessionsController.logout);
  app.get('/admin/logout', loginAdminControler.logout);
};

module.exports = configRoutes;
