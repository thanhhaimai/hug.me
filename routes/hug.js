var twilioClient = require('../twilio.js').client;
var util = require('../util.js');
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
    phoneNumber: req.body.phoneNumber,
    status: 'awaiting'
  }, function(err, result) {
    util.dieOnError(err);
    twilioClient.sendSms({
      to: '+17144175062',
      from: '+19492163884',
      body: 'Yo! hug this person http://www.facebook.com/thanhhaimai'
    }, function(err, responseData) {
      util.dieOnError(err);
      res.send("A hug is on its way");
    });
  });
};

exports.acceptHug = function(req, res) {
  var fbid = req.body.fbid;
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
