var cards = $('.card');
var current = $('#currentWeather')
var sidebar = $('#sidenav')
var searchbar = $('#searchbar')
var search = $('#searchContainer')
var states = $('#states')
var searchSubmit = $('#submission')
var lat;
var long;
var apiURL ;
var apiResponse;
var locationResponse;
var currentDate =  moment().format("MM/DD/YYYY"); 


navigator.geolocation.getCurrentPosition(success, error);

searchbar[0].addEventListener('keypress', function(e){
    if (e.key === 'Enter') {
        console.log(searchbar[0].value)
        console.log($('#states option:selected')[0].value)
        generateLocation(searchbar[0].value,$('#states option:selected')[0].value)
        console.log('attempt',lat,long)
    }
})
searchSubmit[0].addEventListener('click', function(){
        console.log(searchbar[0].value)
        console.log($('#states option:selected')[0].value)
        generateLocation(searchbar[0].value,$('#states option:selected')[0].value)
        console.log('attempt',lat,long)
})



console.log('date', currentDate)
                
var c = 'new york city'
var s = 'ny'

// generateLocation(c,s)

function searchSubmit() {
    var query = searchbar.value
    var state = states.value 
}

function generateLocation(city, state) {
    locationURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + ',' + state  + ',us&appid=4905034d29ec196fc6fefde21b5e616e'
    // locationURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=4905034d29ec196fc6fefde21b5e616e'

    // console.log('geocall attempt')
    geoCall(locationURL)
}


function geoCall(url) {
    $.ajax({
        url: url,
        method: 'GET',
      })
        .then(function (response) {
        // console.log("geocall")
            console.log(response);
            locationResponse = response;
            lat = locationResponse[0].lat;
            long = locationResponse[0].lon;
            console.log('legit',lat,long)
            generateURL();
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
        // console.log(apiURL)
        ajaxCall()
    }
  
    
    function updateWeather(){
        updateCards();
        updateCurrent();
        // console.log('1')
    }
    
    function updateCurrent() {
        // response.chi
        // console.log("temp: ", apiResponse.current.temp)
        // console.log("wind speed:", apiResponse.current.wind_speed)
        // console.log("humidity", apiResponse.current.humidity)
        // console.log("UVI Index: ", apiResponse.current.uvi)
        current[0].children[0].textContent = searchbar[0].value +' '+ currentDate 
        current[0].children[1].textContent = 'Temp: ' + apiResponse.current.temp + ' °F'
        current[0].children[2].textContent = 'Wind: ' + apiResponse.current.wind_speed + ' MPH'
        current[0].children[3].textContent = 'Humidity: ' + apiResponse.current.humidity + ' %'
        current[0].children[4].textContent = 'UVI Index: ' + apiResponse.current.uvi 

        
    }
    
    function updateCards (){
        for(i=0;i<cards.length;i++) {
            
            var s = new Date(apiResponse.daily[i+1].dt *1000); 
            // var s = new Date(apiResponse.daily[i+1].dt).getDate()
            console.log(s.toLocaleDateString())
            cards[i].children[0].textContent = s.toLocaleDateString()
            cards[i].children[1].textContent = 'Temp: ' + apiResponse.daily[i+1].temp.day + ' °F'
            cards[i].children[2].textContent = 'Wind: ' + apiResponse.daily[i+1].wind_speed + ' MPH'
            cards[i].children[3].textContent = 'Humidity: ' + apiResponse.daily[i+1].humidity + ' %'
        }
    }
    
    
    // initialize the forecast for current location using navigator geolocation
    function success(pos) {
        var coordinates = pos.coords;
        lat = coordinates.latitude;
        long = coordinates.longitude;
        generateURL();
        ajaxCall();
        // console.log('Your current position is:');
        // console.log(`Latitude : ${coordinates.latitude}`);
        // console.log(`Longitude: ${coordinates.longitude}`);
        // console.log(`More or less ${coordinates.accuracy} meters.`);
    }
    
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        lat = 35.7796
        long = 78.6382
        generateURL();
        ajaxCall();
    }
    
    
    
    
    
cards[0].children[0].textContent = 'seventy four'