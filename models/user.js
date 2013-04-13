// Module used for user module and collection
// can be used for client or server.
//
// Usage:
// var user = new User({
//   phoneNumber: 1234,
//   locationLat: 1234,
//   locationLong: 92,
//   email: 123,
//   name: 342
// });
//
// client.run(function() {
//   mongoClient.collection('user', function(err, collection) {
//     collection.insert(user.toJSON(), function(err) {
//       if (err) {
//         console.log(err);
//       }
//       collection.find().toArray(function(err, results) {
//         if (err) {
//           console.log(err);
//         }
//         console.log(results);
//       });
//     });
//   });
// });

var isServer = module && module.exports;
if (isServer) {
  var Backbone = require('Backbone');
}

(function(root) {

  var required = function(parameter) {
    if (parameter === undefined) {
      throw 'Required param not supplied';
    }
  }

  root.Model = root.Model || {};

  root.Model.User = Backbone.Model.extend({
    initialize: function() {
      required(this.get('phoneNumber'));
      required(this.get('locationLat'));
      required(this.get('locationLong'));
      required(this.get('email'));
      required(this.get('name'));
    }
  });

  root.Collection = root.Collection || {};

  root.Collection.Users = Backbone.Collection.extend({
    model: root.Model.User
  });

})(module && module.exports || this);
