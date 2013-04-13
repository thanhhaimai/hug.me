// Module to handle twilio client
// see http://twilio.github.io/twilio-node/
//
// Example:
//   client.sendSms({
//     to: '+14133420900',
//     from: '+19492163884',
//     body: 'word to you mother'
//   }, function(err, responseData) {
//     if (err) {
//       console.log(err);
//     }
//   });

(function(root){
  var twilio = require('twilio');
  var client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  root.exports.client = client;
})(module);
