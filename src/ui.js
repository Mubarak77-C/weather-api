// src/ui.js
const cityName = document.getElementById("city-name");
const tempElement = document.getElementById("temp");
const descElement = document.getElementById("desc");
const humidityElement = document.getElementById("humidity");
const weatherIcon = document.getElementById("weather-icon");
const searchBtn = document.getElementById("search-btn");

export function setLoading(isLoading) {
  if (isLoading) {
    searchBtn.disabled = true;
    searchBtn.textContent = "Searching...";
    cityName.textContent = "Fetching weather data...";
  } else {
    searchBtn.disabled = false;
    searchBtn.textContent = "Search";
  }
}

export function displayWeather(data, searchedCity) {
  // Capitalize the searched city nicely for the UI
  const formattedCity =
    searchedCity.charAt(0).toUpperCase() + searchedCity.slice(1).toLowerCase();

  cityName.textContent = formattedCity;
  tempElement.textContent = `Temperature: ${Math.round(data.main.temp)} °C`;
  descElement.textContent = `Condition: ${data.weather[0].description}`;
  humidityElement.textContent = `Humidity: ${data.main.humidity}%`;

  // Weather Icon
  const iconCode = data.weather[0].icon;
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIcon.alt = data.weather[0].description;
  weatherIcon.style.display = "block";
}

export function displayError(errorMessage) {
  cityName.textContent = "⚠️ Error";
  tempElement.textContent = errorMessage;
  descElement.textContent = "";
  humidityElement.textContent = "";
  if (weatherIcon) {
    weatherIcon.style.display = "none";
  }
}
