$(function() {
  map = new GMaps({
    div: '#map',
    lat: -12.043333,
    lng: -77.028333
  });
  Location.currentLocation(function(lat, lng) {
    window.currentLocation = {
      lat: lat,
      lng: lng,
    };
    console.log(lat);
    map.setCenter(lat, lng);
    map.removeMarkers();
    map.addMarker({
      lat: lat,
      lng: lng,
    });
  });


  $('#form-search-location').submit(function(e){
    e.preventDefault();
    options = {};
    if (undefined !== window.currentLocation) {
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
