
/*
 * GET users listing.
 */

var User = require('../models/user').Model.User;
var Users = require('../models/user').Collection.Users;
var mongoClient = require('../mongodb').client;

exports.hug = function(req, res){
  res.render('hug');
};

exports.account = function(req, res){
  res.render('account', { user: req.user });
};

exports.login = function(req, res){
  res.render('login', { user: req.user });
};

exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
};

exports.authFb = function(req, res) {
  // The request will be redirected to Facebook for authentication, so this
  // function will not be called.
};

exports.authFbCallback = function(req, res) {
  res.redirect('/hug');
};
