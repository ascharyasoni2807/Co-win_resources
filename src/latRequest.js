export function getLocation() {
    let p = Promise.resolve(null);
    if (navigator.geolocation) {
        p = new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject,  {maximumAge:10000, timeout:5000, enableHighAccuracy: true}))
    }
    return p
}

export function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
  
// function showPosition(position) {
// x.innerHTML = "Latitude: " + position.coords.latitude +
// "<br>Longitude: " + position.coords.longitude;
// }