
/*
 * GET users listing.
 */

var User = require('../models/user').Model.User;
var Users = require('../models/user').Collection.Users;
var mongoClient = require('../mongodb').client;

exports.login = function(req, res){
  res.render('login', { title: 'Express' });
};

exports.hug = function(req, res){
  res.render('hug');
};

exports.signup = function (reg, res) {
  res.render('signup');
};

exports.hug_update = function(req, res){
  console.log(req.body);
}
