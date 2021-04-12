var form = document.querySelector("form")
var searchInput = document.querySelector("input")
var currentWeatherContainer = document.querySelector(".details")
var fiveDaysWeatherContainer = document.querySelector(".results-container")
var searchHistoryContainer = document.querySelector(".search-history")
var API_KEY = "62782709d4613dd6c6e97112944f0625"


function fetchCurrentWeather (url) {
    fetch(url)
    .then(function (response) {
        return response.json()
    })
    .then(function(data) {
        fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=58ee873c9d639e1c4a248c21a4188189`)
        .then(function(response) {
            return response.json()
        })
        .then(function(UV_data) {
            displayCurrentWeather(data, UV_data.value)
        })
        fetchFiveDaysForecast( `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude={part}&appid=58ee873c9d639e1c4a248c21a4188189`)
    })
}

function showUVIndexColor () {
    var uvIndexSpan = document.querySelector("#uv-index")
    var uvIndex = Number(uvIndexSpan.textContent)
    
    if(uvIndex >= 0 && uvIndex < 2) {
        uvIndexSpan.classList.add("uv-green")
    } else if (uvIndex >= 3 && uvIndex < 6) {
        uvIndexSpan.classList.add("uv-yellow")
    } else if (uvIndex >= 6 && uvIndex <= 7) {
        uvIndexSpan.classList.add("uv-orange")
    } else if (uvIndex >= 8) {
        uvIndexSpan.classList.add("uv-red")
    }
}

function displayCurrentWeather (data, UV_INDEX) {
    console.log(data)
    var iconcode = data.weather[0].icon
    var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
    var time = data.dt;
    var newTime = moment.unix(time).format("DD/MM/YYYY")
    var output = ""
    output = `
    <h3>${data.name} (${newTime}) <span><img src=${iconurl} /></span></h3>
    <ul>
        <li>Temp: ${data.main.temp}°F</li>
        <li>Wind: ${data.wind.speed} MPH</li>
        <li>Humidity ${data.main.humidity}</li>
        <li>UV index <span id="uv-index">${UV_INDEX}</span></li>
    </ul>
    `
    currentWeatherContainer.innerHTML = output
    showUVIndexColor()
}

function displayFiveDaysForecast (data) {
    var dailyData = data.daily.slice(0, 5)
    var output = ""
    fiveDaysWeatherContainer.innerHTML = ""
    dailyData.forEach(function (item) {
        var iconcode = item.weather[0].icon
        var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
        var time = item.dt;
        var newTime = moment.unix(time).format("DD/MM/YYYY")
        output = `
        <article class="col-lg-2">
            <ul>
                <li>${newTime}</li>
                <li><img src=${iconurl} /></li>
                <li>Temp: ${item.temp.day}°F</li>
                <li>Wind: ${item.wind_speed} MPH</li>
                <li>Humidity ${item.humidity} %</li>
            </ul>
        </article>
        `
        fiveDaysWeatherContainer.innerHTML += output
    })
}

function fetchFiveDaysForecast (url) {
    fetch (url)
    .then(function (response) {
        return response.json()
    })
    .then(function(data) {
        displayFiveDaysForecast(data)
    })
 
}

function saveToLocalStorage (name) {
    var cityNameArr = []
    if(localStorage.getItem("cityName") === null) {
        cityNameArr = []
    } else {
        cityNameArr = JSON.parse(localStorage.getItem("cityName"))
    }
    cityNameArr.push(name)
    localStorage.setItem("cityName", JSON.stringify(cityNameArr))
}

function fetchWeatherCondition (event) {
    event.preventDefault()
    var cityName = searchInput.value
    saveToLocalStorage(cityName)
    var CURRENT_WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
    fetchCurrentWeather(CURRENT_WEATHER_API)
   
}

function fetchWeatherConditionsByHistory (event) {
    var cityName = event.target.textContent;
    var CURRENT_WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
    fetchCurrentWeather(CURRENT_WEATHER_API)
    console.log(cityName)
}

function displaySearchHistory () {
    var searchHistory = JSON.parse(localStorage.getItem("cityName"))
    searchHistoryContainer.innerHTML = ""
    searchHistory?.forEach(function (item) {
        var output = ""
        output = `
        <div class="search-item" onclick="fetchWeatherConditionsByHistory(event)">${item}</div>
        `
        searchHistoryContainer.innerHTML += output
    })
}

form.addEventListener("submit", function(event) {
    fetchWeatherCondition(event)
    displaySearchHistory()
})

window.addEventListener("load", displaySearchHistory())
