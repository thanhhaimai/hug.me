// Module to handle monbodb client
// see https://github.com/mongodb/node-mongodb-native

(function(root){
  var mongodb = require('mongodb');
  var server = new mongodb.Server(
    '127.0.0.1', 27017);

  var client = new mongodb.Db('test', server, {w: 1});

  client.open(function(err, p_client) {
    if (err) {
      console.log(err);
    }
  });

  root.exports.client = client;
})(module);
