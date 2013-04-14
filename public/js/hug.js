$(function() {
  window.loc = {
    lat: 37.8717,
    lng: 122.2728,
  };

  var locateUser = function() {
    GMaps.geolocate({
      success: function(position) {
        window.loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      },
      always: function() {
        var lat = window.loc.lat,
            lng = window.loc.lng;
        var map = new GMaps({
          div: '#map',
          lat: lat,
          lng: lng,
        });
        map.setCenter(lat, lng);
        map.removeMarkers();
        window.locationMarker = map.addMarker({
          lat: lat,
          lng: lng,
          draggable: true,
        });
        window.map = map;
      }
    });
  };

  var updateByAddress = function(address) {
    options = {};
    if (window.loc !== null) {
        var lat1 = window.loc.lat - 0.5,
            lng1 = window.loc.lng - 0.5,
            lat2 = window.loc.lat + 0.5,
            lng2 = window.loc.lng + 0.5;
        options.bounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(lat1, lng1),
          new google.maps.LatLng(lat2, lng2)
        );
    }
    options.address = address;
    options.callback = function(results, status){
      if(status=='OK'){
        var latlng = results[0].geometry.location;
        window.loc = {
          lat: latlng.lat(),
          lng: latlng.lng(),
        };
        window.map.setCenter(latlng.lat(), latlng.lng());
        window.map.removeMarkers();
        window.locationMarker = map.addMarker({
          lat: latlng.lat(),
          lng: latlng.lng(),
          draggable: true,
        });
      }
    };
    GMaps.geocode(options);
  };

  locateUser();

  $("#btn-locate-user").click(function() {
      locateUser(map);
  });

  $('#form-search-location').submit(function(e){
    e.preventDefault();
    updateByAddress($("#address").val().trim());
  });

  // update current location to the server and set user status
  // to accept hug
  $("#submit-hug").click(function() {


  });

  
});
