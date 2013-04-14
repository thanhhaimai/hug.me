// Module to handle monbodb client
// see https://github.com/mongodb/node-mongodb-native

var util = require('./util.js');

(function(root){
  var mongodb = require('mongodb');
  var server = new mongodb.Server(
    '127.0.0.1', 27017);

  var databaseName = 'test';
  var client = new mongodb.Db(
    databaseName,
    server,
    {w: 1});

  var isOpen = false;

  root.exports.client = client;

  client.run = function(fn) {
    if (!isOpen) {
      client.open(function(err, p_client) {
        util.dieOnError(err);
        fn();
      });
    } else {
      fn();
    }
  }
})(module);
