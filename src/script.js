// src/script.js
import { fetchWeatherData } from "./api.js";
import { setLoading, displayWeather, displayError } from "./ui.js";

const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const unitToggleBtn = document.getElementById("unit-toggle");

// GLOBAL STATE (Must be at the root scope)
let currentWeatherData = null;
let currentCityName = "";
let isMetric = true;

async function handleSearch(city) {
  try {
    setLoading(true);
    currentCityName = city;
    currentWeatherData = await fetchWeatherData(city);

    isMetric = true; // Line 23

    displayWeather(currentWeatherData, currentCityName, isMetric);
  } catch (error) {
    console.error("An error occurred during search:", error);
    displayError(error.message);
  } finally {
    setLoading(false);
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = cityInput.value.trim();
  if (query) {
    handleSearch(query);
    cityInput.value = "";
  }
});

unitToggleBtn.addEventListener("click", () => {
  if (!currentWeatherData) return;
  isMetric = !isMetric;
  displayWeather(currentWeatherData, currentCityName, isMetric);
});

handleSearch("Tokyo");
