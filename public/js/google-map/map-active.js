function initMap() {
    // The location of Uluru
    var uluru = { lat: 13.087210, lng: 77.660490 };
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('googleMap'), { zoom: 4, center: uluru });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({ position: uluru, map: map });
}