const API_KEY = '63faa9bd48587fd237dd8f2de76bb689';
const COORDS = 'coords';
const weather = document.querySelector('.js-weather');

function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        ).then(function(res){
            return res.json();
        }).then(function(json){
            // console.log(json);
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature} @ ${place}`
        })
}

function saveCoords(coordsObject){
    localStorage.setItem(COORDS, JSON.stringify(coordsObject));
}

function handleGeoSucces(position){
    // console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const coordsObject = {
        latitude,
        longitude,
    }
    saveCoords(coordsObject);
    getWeather(latitude, longitude);
}

function handleGeroError(){
    console.log('error')
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeroError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoords);
        // console.log(parseCoords)
        getWeather(parseCoords.latitude, parseCoords.longitude);

    }
}

function init() {
    loadCoords();
}

init();