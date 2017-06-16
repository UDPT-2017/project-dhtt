var aboutController = require('../controllers/aboutController');

var configRoutes = function(app){
  app.get('/', function(req, res){
    res.render('home');
  });
  app.get('/about', aboutController.getAbout);
};

module.exports = configRoutes;
