var mongoClient = require('../mongodb').client;

exports.hug = function(req, res){
  res.render('hug');
};

exports.hugs = function(req, res) {
  mongoClient.hugCollection.find().toArray(function(err, result) {
      util.dieOnError(err);
      res.send(result);
  });
};

exports.requestHug = function(req, res) {
  mongoClient.userCollection.insert({
    fbid: req.user.fbid,
    status: 'awaiting'
  }, function(err, result) {
    util.dieOnError(err);
    done(null, result);
  });
};

exports.acceptHug = function(req, res) {
  var fbid = req.data.fbid;
  mongoClient.userCollection.findOne({
    fbid: fbid
  }, function(err, result) {
    result.huggerfbid = req.user.fbid;
    result.status = 'accepted';
    result.save(function() {
      res.send('');
    });
  });
};
