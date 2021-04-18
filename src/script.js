let now = new Date();

let h2 = document.querySelector("h2");

let date = now.getDate();
let hours = now.getHours();
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
