const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

// DOM Elements
const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const tempElement = document.getElementById("temp");
const descElement = document.getElementById("desc");
const humidityElement = document.getElementById("humidity");
const weatherIcon = document.getElementById("weather-icon");

// Function to update the DOM with weather data
function displayWeather(data, searchedCity) {
  cityName.textContent =
    searchedCity.charAt(0).toUpperCase() + searchedCity.slice(1).toLowerCase();
  tempElement.textContent = `Temperature: ${Math.round(data.main.temp)} °C`;
  descElement.textContent = `Condition: ${data.weather[0].description}`;
  humidityElement.textContent = `Humidity: ${data.main.humidity}%`;

  // Handle Weather Icon safely
  const iconCode = data.weather[0].icon;
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIcon.alt = data.weather[0].description;
  weatherIcon.style.display = "block"; // Make icon visible
}

// Main async weather pipeline
async function getWeatherData(city) {
  try {
    // 1. Geocoding fetch ( using secure https:// )
    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`,
    );

    if (!geoResponse.ok) {
      throw new Error(`Geocoding failed with status: ${geoResponse.status}`);
    }

    const geoData = await geoResponse.json();
    if (geoData.length === 0) {
      throw new Error("Location not found! Please check the city name.");
    }

    // 2. Exact match using .find()
    // Improved matching: Try to find an exact name match first.
    // If not found, gracefully fall back to the most relevant result (geoData[0])
    // to avoid missing major cities due to minor spelling or neighborhood differences.
    const matchedLocation =
      geoData.find((item) => item.name.toLowerCase() === city.toLowerCase()) ||
      geoData[0];

    const lat = matchedLocation.lat;
    const lon = matchedLocation.lon;
    console.log(
      `Selected Location: ${matchedLocation.name}, Country: ${matchedLocation.country}, Lat: ${lat}, Lon: ${lon}`,
    );

    // 3. Weather fetch
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
    );

    if (!weatherResponse.ok) {
      throw new Error(
        `Weather fetch failed with status: ${weatherResponse.status}`,
      );
    }

    const weatherData = await weatherResponse.json();
    displayWeather(weatherData, city);
  } catch (error) {
    console.error("An error occurred:", error.message);
    cityName.textContent = "⚠️ Error";
    tempElement.textContent = error.message;
    descElement.textContent = "";
    humidityElement.textContent = "";

    // Hide icon on error
    if (weatherIcon) {
      weatherIcon.style.display = "none";
    }
  }
}

// Event Listener for Search Form
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = cityInput.value.trim();

  if (query) {
    getWeatherData(query);
    cityInput.value = "";
  }
});

// Initial load
getWeatherData("Tokyo");
