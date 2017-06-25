var express = require('express'),
  bodyParser = require('body-parser'),
  pg = require('pg'),
  ect = require('ect'),
  app = express(),
  path = require('path'),
  session = require('express-session'),
  passport = require('passport'),
  util = require('util')
  FacebookStrategy = require('passport-facebook').Strategy,
  cookieParser = require('cookie-parser'),
  config = require('./app/config/config');


//Connection string of the database (postgres) used for fb-login 
var connection = "postgres://"+config.username+":"+config.password+"@"+config.host+"/"+config.database+"";


// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// Use the FacebookStrategy within Passport.
passport.use(new FacebookStrategy({
    clientID:           config.facebook_api_key,
    clientSecret:       config.facebook_api_secret ,
    callbackURL:        config.callback_url,
    profileFields:      ['id', 'emails', 'name']
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      //Check whether the User exists or not using profile.id
      if(config.use_database === 'true')
      {
        pg.connect(connection, function(err, client, done){
          client.query("SELECT * from users where email= $1", [profile.emails[0].value], function(err,rows){
            if(err) throw err;
            if(rows.rowCount === 0)
            {
              console.log("There is no such user, adding now");
              if(!profile.name.middleName)
              {
                client.query("INSERT into users(name, password, email, is_admin) VALUES($1, $2, $3, 'false')", 
                  [profile.name.givenName + " " + profile.name.familyName, profile.id, profile.emails[0].value]);
              }
              else
              {
                client.query("INSERT into users(name, password, email, is_admin) VALUES($1, $2, $3, 'false')", 
                  [profile.name.givenName + " " + profile.name.middleName + " " + profile.name.familyName, profile.id, profile.emails[0].value]);
              }
            }
            else
            {
              console.log("User already exists in database");
            }
          });
        });
      }
      return done(null, profile);
    });
  }
));


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser({ uploadDir: path.join(__dirname, 'files'), keepExtensions: true }));
app.use(session({secret: 'max', resave: false, saveUninitialized: true}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', key: 'sid'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));


require('./app/config/express')(app);
require('./app/config/routes')(app);


//Handle FB-login
app.get('/auth/facebook', passport.authenticate('facebook',{scope:'email'}));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect : '/', failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logoutFB', function(req, res){
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}


app.listen(process.env.PORT || 3000, function(){
  console.log('Server is listening in port:' + 3000 )
 })
