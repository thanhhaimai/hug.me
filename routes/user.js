
/*
 * GET users listing.
 */

exports.login = function(req, res){
  res.render('login', { title: 'Express' });
};

exports.hug = function(req, res){
  res.render('hug');
};

exports.signup = function (reg, res) {
  res.render('signup');
}
