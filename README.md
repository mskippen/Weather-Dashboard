# Weather Dashboard App

## This app

Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Developers are often tasked with retrieving data from another application's API and using it in the context of their own. A weather dashboard has been built that will run in the browser and feature dynamically updated HTML and CSS.

This app has used the [OpenWeather One Call API](https://openweathermap.org/api/one-call-api) to retrieve weather data for cities. Local storage has been used `localStorage` to store any persistent data.

## User Story

```
AS A traveler
YOU WANT to see the weather outlook for multiple cities
SO THAT you can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN you search for a city
THEN you are presented with current and future conditions for that city and that city is added to the search history
WHEN you view current weather conditions for that city
THEN you are presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN you view the UV index
THEN you are presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN you view future weather conditions for that city
THEN you are presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN you click on a city in the search history
THEN you are again presented with current and future conditions for that city
```

## Mock-Up

The following image shows the web application's appearance and functionality:

![The weather app includes a search option, a list of cities, and a five-day forecast and current weather conditions for Atlanta.]
<br>(./Assets/images/WeatherSearchByCity.JPG)
<br>(./Assets/images/ColouredUVIndex.JPG)
<br>(./Assets/images/SavesToLocalStorage.JPG)
<br>(./Assets/images/WeatherSearchByCityFinalDisplay.JPG)

## URLs

* The URL of the functional, deployed application: <https://mskippen.github.io/Weather-Dashboard/>
* The URL of the GitHub repository. Give the repository a unique name and include a readme describing the project: <https://github.com/mskippen/Weather-Dashboard.git>

- - -
© 2021 Project Agents Pty Ltd. Confidential and Proprietary. All Rights Reserved.
