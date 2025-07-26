function initmap() {
    let displayMap = document.getElementById("displayMap");
    let routeBox = document.getElementById("routeBox");

    let townCenter = { lat: 43.5586, lng: -79.7116 };

    let myMap = new google.maps.Map(displayMap, {
        zoom: 11,
        center: townCenter,
        fullscreenControl: false
    });

    new google.maps.Marker({
        position: townCenter,
        map: myMap,
        title: "Erin Mills Town Centre"
    });

    let routeFind = new google.maps.DirectionsService();
    let routeDraw = new google.maps.DirectionsRenderer();
    routeDraw.setMap(myMap);
    routeDraw.setPanel(routeBox);

    navigator.geolocation.getCurrentPosition(getPos, handleError);

    function getPos(pos) {
        let myPosition = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
        };

        let myRoute = {
            origin: myPosition,
            destination: townCenter,
            travelMode: "DRIVING"
        };

        routeFind.route(myRoute, function (result, status) {
            if (status === "OK") {
                routeDraw.setDirections(result);
            } else {
                routeBox.textContent = "Direction is unavailable: " + status;
            }
        });
    }

    function handleError(error) {
        routeBox.textContent = "Geolocation failed: " + error.message;
    }

    let showRouteBtn = document.getElementById("showRouteBtn");
    let thisLocation = document.getElementById("thisLocation");

    showRouteBtn.addEventListener("click", function () {
        let myRoute = {
            origin: thisLocation.value,
            destination: townCenter,
            travelMode: "DRIVING"
        };

        routeFind.route(myRoute, function (result, status) {
            if (status === "OK") {
                routeDraw.setDirections(result);
            } else {
                routeBox.textContent = "Direction is unavailable: " + status;
            }
        });
    });
}
