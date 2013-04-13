(function($, root) {
  root.Location = {
    distance: function(lat1,lng1,lat2,lng2,unit) {
      unit = unit || 'km';
      // Converts degrees to Rads
      if (typeof(Number.prototype.toRad) === "undefined") {
        Number.prototype.toRad = function() {
          return this * Math.PI / 180;
        }
      }
      var R = '';
      if (unit == 'km') {
        R = 6371; // km
      } else {
        R = 3959; // mi
      }
      var dLat = (parseFloat(lat2)-parseFloat(lat1)).toRad();
      var dLon = (parseFloat(lng2)-parseFloat(lng1)).toRad();
      var lat1 = parseFloat(lat1).toRad();
      var lat2 = parseFloat(lat2).toRad();
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c;
      return d;
    },
    currentLocation: function(callback) {
      GMaps.geolocate({
        success: function(position) {
          callback(position.coords.latitude, position.coords.longitude);
        },
        error: function(error) {
          console.error('Geolocation failed: ' + error.message);
        },
        not_supported: function() {
          console.error('Your browser does not support geolocation');
        },
      });
    },

    closestUser: function(lat, lng, userList) {
      return _.min(userList, function(user) {
        return Location.distance(lat, lng, user.lat, user.lng);
      });
    },

    _test: function() {
      userList = [{name: 'thai', lat: 10, lng: 10}, {name: 'huan', lat: 80, lng: 80}];
      console.log(Location.closestUser(10, 11, userList));
    }
  };

  $(function() {
    Location._test();
  });
})(jQuery, window);
