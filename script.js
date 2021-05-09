var cards = $('.card');
var current = $('#currentWeather')
var sidebar = $('#sidenav')
var searchbar = $('#searchbar')
var search = $('#searchContainer')
var states = $('#states')
var searchSubmit = $('#submission')
var pastSearches = $('#pastSearches')
var currentLocation = $('#currentLocation')
var lat;
var long;
var apiURL ;
var apiResponse;
var locationResponse;
var currentDate =  moment().format("MM/DD/YYYY"); 
var currentCity;



//event listeners
    // listener for the current location button
currentLocation[0].addEventListener('click', function(){
    navigator.geolocation.getCurrentPosition(success, error);

})
    //listeners for search submission 
    //submit with Enter
searchbar[0].addEventListener('keypress', function(e){
    if (e.key === 'Enter') {
        console.log(searchbar[0].value)
        console.log($('#states option:selected')[0].value)
        generatePastSearch(searchbar[0].value,$('#states option:selected')[0].value);
        generateLocation(searchbar[0].value,$('#states option:selected')[0].value)
        console.log('attempt',lat,long)
    }
})
    //submit with search button
searchSubmit[0].addEventListener('click', function(){
        console.log(searchbar[0].value)
        console.log($('#states option:selected')[0].value)
        generatePastSearch(searchbar[0].value,$('#states option:selected')[0].value);
        generateLocation(searchbar[0].value,$('#states option:selected')[0].value)
        console.log('attempt',lat,long)
})


//Get latitude and longitude based on serach values
function generateLocation(city, state) {
    locationURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + ',' + state  + ',us&appid=4905034d29ec196fc6fefde21b5e616e'
    currentCity = city.charAt(0).toUpperCase() + city.slice(1)
    geoCall(locationURL)
}

//Get latitude-longitude API response with weather info given URL
function geoCall(url) {
    $.ajax({
        url: url,
        method: 'GET',
      })
        .then(function (response) {
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

//use latitude longitude values to build weather API url
function generateURL () {
    apiURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&units=imperial&exclude=minutely,hourly&appid=4905034d29ec196fc6fefde21b5e616e'
    ajaxCall()
}
//Get weather info API response with weather info given URL
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

 
  
//grouping update current weather and forecast cards    
function updateWeather(){
    updateCards();
    updateCurrent();
}


//update current weather
function updateCurrent() {
    current[0].children[0].textContent = currentCity +' '+ currentDate 
    current[0].children[1].setAttribute('src', `https://openweathermap.org/img/wn/${apiResponse.current.weather[0].icon}@2x.png`)
    current[0].children[2].textContent = 'Temp: ' + apiResponse.current.temp + ' °F'
    current[0].children[3].textContent = 'Wind: ' + apiResponse.current.wind_speed + ' MPH'
    current[0].children[4].textContent = 'Humidity: ' + apiResponse.current.humidity + ' %'
    current[0].children[5].textContent = 'UVI Index: ' + apiResponse.current.uvi 

    
}

//update forecast cards
function updateCards (){
    for(i=0;i<cards.length;i++) {
        
        var s = new Date(apiResponse.daily[i+1].dt *1000); 
        cards[i].children[0].textContent = s.toLocaleDateString()
        cards[i].children[1].setAttribute('src', `https://openweathermap.org/img/wn/${apiResponse.daily[i+1].weather[0].icon}@2x.png`)
        cards[i].children[2].textContent = 'Temp: ' + apiResponse.daily[i+1].temp.day + ' °F'
        cards[i].children[3].textContent = 'Wind: ' + apiResponse.daily[i+1].wind_speed + ' MPH'
        cards[i].children[4].textContent = 'Humidity: ' + apiResponse.daily[i+1].humidity + ' %'
    }
}


// get the forecast for current location using navigator geolocation
function success(pos) {
    console.log(pos)
    var coordinates = pos.coords;
    lat = coordinates.latitude;
    long = coordinates.longitude;
    currentCity = 'My Current Location (lat:' + lat +', lon:' + long + ')' 
    //unfortunately, would be tough to get current city, can probably achieve with a third API, but that's a task for another day
    generateURL();
    ajaxCall();
}
//if user denies permission to use current location, setting location to Raleigh, NC
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    lat = 35.7796
    long = 78.6382
    generateURL();
    ajaxCall();
}

//build out the search history list
function generatePastSearch(a, b) {
    var li = document.createElement('li');
    var city = a.charAt(0).toUpperCase() + a.slice(1)
    li.textContent = city +', ' + b;
    li.value = b;
    li.addEventListener('click', function(){
        generateLocation(a, b)
        console.log(a, b)
    })
    pastSearches[0].appendChild(li);
    console.log(li)
}    