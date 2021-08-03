var Search = document.querySelector('.text-search');
var button = document.querySelector('.Searchbutton');
var currentW = document.querySelector('.card-body');

var APIKEY = "f90a90d631c6ec2e2b49ee82765594e7";

let URLstart = "https://api.openweathermap.org/data/2.5/onecall?";
let lat = "lat="
let lon = "&lon="
let options = "&units=imperial"
let apids = "&appid="
let fullurl = URLstart + lat + lon + options + apids + APIKEY;

function gencurrentW() {
    fetch(fullurl)
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            console.log(JSON.stringify(data));
            displaycurrentW(data);
            genWeathericon(data);
        });
}

var temp = document.querySelector('.temp');
var humidity = document.querySelector('.humidity');
var WindSpeed = document.querySelector('.WindSpeed');
var UVI = document.querySelector('.UVindex');
var CName = document.querySelector('.city-name');


function displaycurrentW() {
    var tempValue = data.current.temp;
    var humidValue = data.current.humidity;
    var WindspeedValue = data.current.wind_speed;
    var UVindexValue = data.current.uvi;

    temp.innerHTML = tempValue;
    humidity.innerHTML = humidValue;
    WindSpeed.innerHTML = WindspeedValue;
    UVI.innerHTML = UVindexValue;
}

var wiconbase = "http://openweathermap.org/img/wn/";
var wiconend = ".png"

function genWeathericon() {
    let locationIcon = document.querySelector('.Weather-icon');
    const iconinfo = data.weather[0].icon;
    locationIcon.src = (wiconbase + iconinfo + wiconend ); 
}

function genfiveday(Search) {
    fetch(`api.openweathermap.org/data/2.5/forecast?q=${Search}&appid=${APIKEY}`)
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            console.log(JSON.stringify(data));
            genWeathericon(data);
            displayfivedayW(data);
        });
};

var fivedesc = document.querySelector('.fivedescription');
var fivetemp = document.querySelector('.fivetemp');
var fiveloc = document.querySelector('fivelocation');

function displayfivedayW(data) {
    var farenheit = Math.round(((parseFloat(data.list.main.temp)-273.15)*1.8)+32);
    var descc = data.weather[0].description;
    var locc =  data.city.name;
    var countryy = data.city.country;

    fivedesc.innerHTML = descc;
    fivetemp.innerHTML = farenheit + '&deg;';
    fiveloc.innerHTML = locc + '' + countryy;
}

button.addEventListener("click", () => {
    console.log(Search.value);
    if (Search.value){
        genfiveday(Search.value);
        gencurrentW(Search.value);
    }
});