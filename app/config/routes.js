var aboutController = require('../controllers/aboutController');

var configRoutes = function(app){
  app.get('/', function(req, res){
    res.render('home');
  });
  app.get('/about', aboutController.getAbout);
  app.get('/admin', function(req, res){
    res.render('admin/dashboard/dashboard');
  });
};

module.exports = configRoutes;
