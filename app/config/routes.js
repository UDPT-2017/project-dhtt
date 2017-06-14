var configRoutes = function(app){
  app.get('/', function(req, res){
    res.render('home');
  });
};

module.exports = configRoutes;
