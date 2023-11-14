// Search Engine
function searchWeather(response) {
  let iconElement = document.querySelector("#current-temp-icon");
  let tempElement = document.querySelector("#current-temp-value");
  let cityElement = document.querySelector("#current-city");
  let descElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.getElementById("#current-date");
  let date = new Date(response.data.time * 1000);

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="weather icon">`;
  tempElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  timeElement.innerHTML = displayDate(date);
}

// Current Date Display
function displayDate(date) {
  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${WEATHER_API_KEY}&units=metric`;
  axios.get(url).then(searchWeather);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

import WEATHER_API_KEY from "./apikey.js";

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

searchCity("Kuala Lumpur");
