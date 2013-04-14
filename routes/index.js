/*
 * GET home page.
 */

exports.index = function(req, res) {
  console.log(req.user);
  if (!req.isAuthenticated()) {
    res.render('index');
  } else {
    res.redirect('/hug');
  }
};
