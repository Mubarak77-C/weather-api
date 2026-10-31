// src/api.js
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export async function fetchWeatherData(city) {
  // 1. Geocoding fetch
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

  // Use the first result for the major city
  const matchedLocation = geoData[0];
  const { lat, lon } = matchedLocation;

  // 2. Weather fetch
  const weatherResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
  );

  if (!weatherResponse.ok) {
    throw new Error(
      `Weather fetch failed with status: ${weatherResponse.status}`,
    );
  }

  const weatherData = await weatherResponse.json();
  return weatherData;
}
