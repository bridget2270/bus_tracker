const markerArray = [];
let busArray = [];

// Starter code to make map
mapboxgl.accessToken = 'pk.eyJ1IjoiYnJpZGdldDIyNzAiLCJhIjoiY2xkczVsY3UwMDF4NzNvb3pxY3BhNzNzaiJ9.M4jDlhFxOiP-RxJ1O3GszA';
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-71.104081, 42.365554],
    zoom: 12,
})

//using fetch to get MBTA bus data
const run = async () => {
    busArray = await getBusLocations();
    console.log(busArray);
    document.getElementsByClassName('run')
}
const getBusLocations = async () => {
    const response = await fetch('https://api-v3.mbta.com/vehicles?api_key=ca34f7b7ac8a445287cab52fb451030a&filter[route]=1&include=trip');
    const json = await response.json();
    return json.data;
}

// after first run, creates first set of markers

const createMarkers = () => {
    for(bus of busArray) {
        const marker = new mapboxgl.Marker()
            .setLngLat([bus.attributes.longitude, bus.attributes.latitude])
            .addTo(map);

        const item = {
            'marker': marker,
            'id': bus.id
        }
        markerArray.push(item);
        document.getElementsByClassName('createMarkers')

    }
}

//After next run() to Update markers

const updateMarker = (num) => {
    const busToUpdate = getBus(markerArray[num].id);
    console.log(busToUpdate);
    markerArray[num].marker.setLngLat([busToUpdate.attributes.longitude, busToUpdate.attributes.latitude])
    document.getElementsByClassName('updateLocation')
}

//function that finds bus object by the 'id' to update the marker
const getBus = (markerId) => {
    const result = busArray.find((item) =>
    item.id === markerId
    );
    console.log(result)
    return result;
}

