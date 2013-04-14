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

  root.client = client;
  client.open(function() {
    client.collection('user', function(err, collection) {
      util.dieOnError(err);
      client.userCollection = collection;
    });

    client.collection('hugRequest', function(err, collection) {
      util.dieOnError(err);
      client.hugRequestCollection = collection;
    });
  });
})(module.exports);
