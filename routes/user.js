
/*
 * GET users listing.
 */

var User = require('../models/user').Model.User;
var Users = require('../models/user').Collection.Users;
var mongoClient = require('../mongodb').client;

exports.login = function(req, res){
  res.render('login', { title: 'Express' });
};
