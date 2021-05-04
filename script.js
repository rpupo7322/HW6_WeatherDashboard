var cards = $('.card');
var current = $('#currentWeather')
var sidebar = $('#sidenav')
var searchbar = $('#searchbar')
var lat;
var long;
var apiURL ;
var apiResponse;


// navigator.geolocation.getCurrentPosition(success, error);

// searchbar.addEventListener('submit', function(){
//     console.log(searchbar.value)

// })
var c = 'atlanta'
var s = 'ga'

generateLocation(c,s)

function searchSubmit() {
    var query = searchbar.value
}

function generateLocation(city, state) {
    locationURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + ',' + state  + '&appid=4905034d29ec196fc6fefde21b5e616e'
    locationURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=4905034d29ec196fc6fefde21b5e616e'

    console.log('geocall attempt')
    geoCall(locationURL)
}


function geoCall(url) {
    $.ajax({
        url: url,
        method: 'GET',
      })
        .then(function (response) {
        console.log("geocall")
            console.log(response);
        })
        .catch(function (error) { 
            console.log('error:', error);
        });
}

function ajaxCall() {
    $.ajax({
        url: apiURL,
        method: 'GET',
      })
        .then(function (response) {
        console.log(response);
        apiResponse = response;
        updateWeather();
        })
        .catch(function (error) { 
            console.log('error:', error);
        });
}
    
    // console.log(lat)
    // console.log(long)
    
    
    
    function generateURL () {
        apiURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&units=imperial&exclude=minutely,hourly&appid=4905034d29ec196fc6fefde21b5e616e'
        console.log(apiURL)
    }
  
    
    function updateWeather(){
        // updateCards();
        updateCurrent();
        // console.log('1')
    }
    
    function updateCurrent() {
        // response.chi
        console.log("temp: ", apiResponse.current.temp)
        console.log("wind speed:", apiResponse.current.wind_speed)
        console.log("humidity", apiResponse.current.humidity)
        console.log("UVI Index: ", apiResponse.current.uvi)

        
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
        generateURL();
        ajaxCall();
        console.log('Your current position is:');
        console.log(`Latitude : ${coordinates.latitude}`);
        console.log(`Longitude: ${coordinates.longitude}`);
        console.log(`More or less ${coordinates.accuracy} meters.`);
    }
    
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        lat = 35.7796
        long = 78.6382
        generateURL();
        ajaxCall();
    }
    
    
    
    
    
cards[0].children[0].textContent = 'seventy four'