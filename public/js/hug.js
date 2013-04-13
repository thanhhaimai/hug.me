$(function() {
  window.currentLocation = {
    lat: 37.8717,
    lng: 122.2728,
  };
  GMaps.geolocate({
    success: function(position) {
      window.currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    },
    always: function() {
      console.log('creating map');
      map = new GMaps({
        div: '#map',
        lat: window.currentLocation.lat,
        lng: window.currentLocation.lng,
      });
      map.setCenter(window.currentLocation.lat, window.currentLocation.lng);
      map.removeMarkers();
      map.addMarker({
        lat: window.currentLocation.lat,
        lng: window.currentLocation.lng,
      });
    }
    
  });

  $('#form-search-location').submit(function(e){
    e.preventDefault();
    options = {};
    if (window.currentLocation !== null) {
        var lat1 = window.currentLocation.lat - 0.5,
            lng1 = window.currentLocation.lng - 0.5,
            lat2 = window.currentLocation.lat + 0.5,
            lng2 = window.currentLocation.lng + 0.5;
        options.bounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(lat1, lng1),
          new google.maps.LatLng(lat2, lng2)
        );
    }
    options.address = $('#address').val().trim();
    options.callback = function(results, status){
      if(status=='OK'){
        var latlng = results[0].geometry.location;
        window.currentLocation = {
          lat: latlng.lat(),
          lng: latlng.lng(),
        };
        map.setCenter(latlng.lat(), latlng.lng());
        map.removeMarkers();
        map.addMarker({
          lat: latlng.lat(),
          lng: latlng.lng()
        });
      }
    };
    GMaps.geocode(options);
  });
});
