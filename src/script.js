// src/script.js
import { fetchWeatherData } from "./api.js";
import { setLoading, displayWeather, displayError } from "./ui.js";

const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");

async function handleSearch(city) {
  try {
    setLoading(true);
    const weatherData = await fetchWeatherData(city);
    displayWeather(weatherData, city);
  } catch (error) {
    console.error("An error occurred:", error.message);
    displayError(error.message);
  } finally {
    setLoading(false);
  }
}

// Event Listener
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = cityInput.value.trim();

  if (query) {
    handleSearch(query);
    cityInput.value = "";
  }
});

// Initial load default city
handleSearch("Tokyo");
