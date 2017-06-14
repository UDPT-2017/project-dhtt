var express = require('express'),
  bodyParser = require('body-parser'),
  pg = require('pg'),
  ect = require('ect'),
  app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));

require('./app/config/express')(app);
require('./app/config/routes')(app);

app.listen(process.env.PORT || 3000, function(){
  console.log('Server is listening in port:' + 3000 )
 })
