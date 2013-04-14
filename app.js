
/**
 * Module dependencies.
 */

var express = require('express')
  , engine = require('ejs-locals')
  , routes = require('./routes')
  , user = require('./routes/user')
  , hug = require('./routes/hug')
  , twilioClient = require('./twilio').client
  , http = require('http')
  , path = require('path')
  , passport = require('./passport.js').passport;

var app = express();

app.engine('ejs', engine);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/',
        routes.index);
app.get('/hug',
        ensureAuthenticated,
        hug.hug);
app.get('/auth/facebook',
        passport.authenticate('facebook'),
        user.authFb);
app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/' }),
        user.authFbCallback);
app.get('/users',
        user.users);
app.get('/hugs',
        hug.hugs);
app.post('/requestHug',
         hug.requestHug);
app.post('/acceptHug',
         hug.acceptHug);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/facebook')
}
