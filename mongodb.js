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

  root.exports.client = client;
  client.open(function() {});

  client.run = function(fn) {
    fn();
  }
})(module);
