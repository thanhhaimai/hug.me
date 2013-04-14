// Module for facebook app
var util = require('./util.js');
var passport = require('passport');
var mongoClient = require('./mongodb').client;

var FacebookStrategy = require('passport-facebook').Strategy;

var FACEBOOK_APP_ID = process.env.FB_APP_ID;
var FACEBOOK_APP_SECRET = process.env.APP_SECRET;

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Facebook profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the FacebookStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Facebook
//   profile), and invoke a callback with a user object.
passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback"
}, function(accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function () {
    // To keep the example simple, the user's Facebook profile is returned to
    // represent the logged-in user.  In a typical application, you would want
    // to associate the Facebook account with a user record in your database,
    // and return that user instead.
    mongoClient.run(function() {
      mongoClient.collection('user', function(err, collection) {
        util.dieOnError(err);

        collection.findOne({fbid: profile.id}, function(err, result) {
          util.dieOnError(err);
          if (result) {
            done(null, result);
          } else {
            collection.insert({
              fbid: profile.id
            }, function(err, result) {
              util.dieOnError(err);
              done(null, result);
            });
          }
        });
      });
    });
  });
}));

module.exports.passport = passport;
