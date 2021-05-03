var cards = $('.card');
var current = $('#currentWeather')
var sidebar = $('#sidenav')
var lat;
var long;


navigator.geolocation.getCurrentPosition(success, error);


console.log(lat)
console.log(long)


var apiURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude={minutely,hourly}&appid={4905034d29ec196fc6fefde21b5e616e}'

console.log(apiURL)



$.ajax({
    url: apiURL,
    method: 'GET',
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) { 
        console.log('error:', error);
      });

    
function updateCurrent() {

}

function updateCards (){
    for(i=0;i<cards.length;i++) {

    }
}


// initialize the forecast for current location using navigator geolocation
function success(pos) {
    var coordinates = pos.coords;
    lat = coordinates.latitude;
    long = coordinates.longitude;
    console.log('Your current position is:');
    console.log(`Latitude : ${coordinates.latitude}`);
    console.log(`Longitude: ${coordinates.longitude}`);
    console.log(`More or less ${coordinates.accuracy} meters.`);
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    lat = 35.7796
    long = 78.6382
  }
  




cards[0].children[0].textContent = 'seventy four'