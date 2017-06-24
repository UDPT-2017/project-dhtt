var express = require('express'),
  bodyParser = require('body-parser'),
  pg = require('pg'),
  ect = require('ect'),
  app = express(),
  path = require('path'),
  session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser({ uploadDir: path.join(__dirname, 'files'), keepExtensions: true }));
app.use(session({secret: 'max', resave: false, saveUninitialized: true}));

require('./app/config/express')(app);
require('./app/config/routes')(app);

app.listen(process.env.PORT || 3000, function(){
  console.log('Server is listening in port:' + 3000 )
 })
