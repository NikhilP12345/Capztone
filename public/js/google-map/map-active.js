function initMap() {
    // The location of Uluru
    var uluru = { lat: 13.087210, lng: 77.660490 };
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('googleMap'), { zoom: 8, center: uluru });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({ position: uluru, map: map, title: "Click to Zoom" });

    map.addListener('center_changed', function() {
        // 3 seconds after the center of the map has changed, pan back to the
        // marker.
        window.setTimeout(function() {
            map.panTo(marker.getPosition());
        }, 3000);
    });

    marker.addListener('click', function() {
        map.setZoom(15);
        map.setCenter(marker.getPosition());
    });
}