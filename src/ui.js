// src/ui.js
const cityName = document.getElementById("city-name");
const tempElement = document.getElementById("temp");
const feelsLikeElement = document.getElementById("feels-like");
const windElement = document.getElementById("wind");
const descElement = document.getElementById("desc");
const humidityElement = document.getElementById("humidity");
const weatherIcon = document.getElementById("weather-icon");
const searchBtn = document.getElementById("search-btn");
const unitToggleBtn = document.getElementById("unit-toggle");

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

// 🛑 CRITICAL: isMetric must be accepted here as a parameter!
export function displayWeather(data, searchedCity, isMetric = true) {
  const formattedCity =
    searchedCity.charAt(0).toUpperCase() + searchedCity.slice(1).toLowerCase();
  cityName.textContent = formattedCity;

  let temp = data.main.temp;
  let feelsLike = data.main.feels_like;
  let windSpeed = data.wind.speed;
  let unitSymbol = "°C";

  if (!isMetric) {
    temp = (temp * 9) / 5 + 32;
    feelsLike = (feelsLike * 9) / 5 + 32;
    unitSymbol = "°F";
  }

  tempElement.textContent = `Temperature: ${Math.round(temp)} ${unitSymbol}`;
  feelsLikeElement.textContent = `Feels like: ${Math.round(feelsLike)} ${unitSymbol}`;
  windElement.textContent = `Wind Speed: ${windSpeed} m/s`;
  descElement.textContent = `Condition: ${data.weather[0].description}`;
  humidityElement.textContent = `Humidity: ${data.main.humidity}%`;

  // Weather Icon
  const iconCode = data.weather[0].icon;
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIcon.alt = data.weather[0].description;
  weatherIcon.style.display = "block";

  // Show the unit toggle button and set text based on isMetric
  unitToggleBtn.style.display = "block";
  unitToggleBtn.textContent = isMetric ? "Switch to °F" : "Switch to °C";
}

export function displayError(errorMessage) {
  cityName.textContent = "⚠️ Error";
  tempElement.textContent = errorMessage;
  feelsLikeElement.textContent = "";
  windElement.textContent = "";
  descElement.textContent = "";
  humidityElement.textContent = "";
  if (weatherIcon) {
    weatherIcon.style.display = "none";
  }
  unitToggleBtn.style.display = "none";
}
