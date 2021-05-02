let now = new Date();

let h2 = document.querySelector("h2");

let date = now.getDate();
let hours = now.getHours();
 if (hours < 10) {
        hours = `0${hours}`;
    }
 let minutes = now.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];

h2.innerHTML = `${day}, ${month} ${date} it's ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date (timestamp * 1000) ;
  let day = date.getDay();
  let days =["Sun", "Mon", "Tue", "Wed","Thu", "Fri", "Sat"];

  return days[day];

}


function displayForecast (response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;
forecast.forEach(function (forecastDay, index) {
  if (index < 5) {

  forecastHTML = forecastHTML + `

                <div class="col-2">
                  <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
                  
                  <img
                    src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                    alt=""
                    width="42"
                  />
                  <div class="weather-forecast-temperatures">
                    <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}° </span>
                    <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}°</span>
                  </div>
                </div>
              
`;
  }
});

forecastHTML = forecastHTML+ `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "b4224e6e4fef229c45c5fd63be38ff06";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showSearchedWeather(response) {
  console.log(response.data)
  let cityResult = document.querySelector("#city");
  let descriptionResult = document.querySelector("#description");
  let tempResult = document.querySelector("#current-temp");
  let humidityResult = document.querySelector("#humidity");
  let windResult = document.querySelector("#wind");
  let iconElement = document.querySelector("#conditions-icon");

  let temperatureRounded = Math.round(response.data.main.temp);

  cityResult.innerHTML = response.data.name;
  descriptionResult.innerHTML = response.data.weather[0].description;
  tempResult.innerHTML = `${temperatureRounded}`;
  humidityResult.innerHTML = response.data.main.humidity;
  windResult.innerHTML = response.data.wind.speed;
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function defineCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-field");
  let searchCity = searchInput.value;
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=42a27136296c7abab1ce16d2f281eec8&units=metric`
    )
    .then(showSearchedWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", defineCity);

function showCurrentLocationWeather(response) {
  let cityResult = document.querySelector("#city");
  let descriptionResult = document.querySelector("#description");
  let tempResult = document.querySelector("#current-temp");
  let humidityResult = document.querySelector("#humidity");
  let windResult = document.querySelector("#wind");

  let temperatureRounded = Math.round(response.data.main.temp);

  cityResult.innerHTML = response.data.name;
  descriptionResult.innerHTML = response.data.weather[0].description;
  tempResult.innerHTML = `${temperatureRounded}`;
  humidityResult.innerHTML = response.data.main.humidity;
  windResult.innerHTML = response.data.wind.speed;

  getForecast(response.data.coord);
}

function retrievePosition(position) {
  let apiKey = "b4224e6e4fef229c45c5fd63be38ff06";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showCurrentLocationWeather);
}

navigator.geolocation.getCurrentPosition(retrievePosition);

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b4224e6e4fef229c45c5fd63be38ff06";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(url).then(showCurrentLocationWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

function changeToFahrenheit(event) {
  event.preventDefault();
  let degrees = document.querySelector("#current-temp");
  let fahrenheitTemperature = ((celsiusTemperature * 9) / 5 + 32);
  degrees.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}
let celsiusTemperature = 0;
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

