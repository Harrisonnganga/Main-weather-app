// Initialize variables for the current city and units
let currCity = "Nairobi";
let units = "metric";

// DOM element references
let city = document.querySelector(".city");
let datetime = document.querySelector(".datetime");
let forecast = document.querySelector('.forecast');
let temperature = document.querySelector(".temperature");
let icon = document.querySelector(".icon");
let minmax = document.querySelector(".minmax")
let realfeel = document.querySelector('.realfeel');
let humidity = document.querySelector('.humidity');
let wind = document.querySelector('.wind');
let pressure = document.querySelector('.pressure');

// Handle form submission for city search
document.querySelector(".search").addEventListener('submit', e => {
    e.preventDefault(); // Prevent default form submission
    let search = document.querySelector(".searchform");
    currCity = search.value; // Update current city
    getWeather(); // Fetch and display weather data
    search.value = ""; // Clear search input
})

// Switch units to metric when Celsius unit is clicked
document.querySelector(".weather_unit_celsius").addEventListener('click', () => {
    if(units !== "metric"){
        units = "metric"; // Set units to metric
        getWeather(); // Update weather data with new units
    }
})

// Switch units to imperial when Fahrenheit unit is clicked
document.querySelector(".weather_unit_farenheit").addEventListener('click', () => {
    if(units !== "imperial"){
        units = "imperial"; // Set units to imperial
        getWeather(); // Update weather data with new units
    }
})


// Convert UNIX timestamp to a formatted date string with timezone adjustment
function convertTimeStamp(timestamp, timezone){
    const convertTimezone = timezone / 3600; // Convert seconds to hours
    const date = new Date(timestamp * 1000);
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
        hour12: false, // 24-hour clock system
    };
    return date.toLocaleString("en", options); // Format the date string
}

// Convert country code to region name
function convertCountryCode(country){
    let regionNames = new Intl.DisplayNames(["en"], {type: "region"});
    return regionNames.of(country); // Get region name based on country code
}

// Fetch weather data from the API and update the DOM elements
function getWeather(){
    const API_KEY = '63badfdfc7e9759ee60b1a9abede05ed';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`)

    .then(res => res.json())
    .then(data => {
        // Update DOM elements with weather data
        city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`;
        datetime.innerHTML = convertTimeStamp(data.dt, data.timezone);
        forecast.innerHTML = `<p>${data.weather[0].main}`;
        // Update other weather-related DOM elements...
    });

     
}



// Load weather data when the page finishes loading
document.addEventListener('DOMContentLoaded', getWeather);
