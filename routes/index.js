/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('index', {numHugs : 12});
};
