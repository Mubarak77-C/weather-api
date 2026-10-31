//const { error } = require("node:console");

console.log("hi");

//3rd ui append with looking data and calling data from weatherData() function
// Function to update the DOM with weather data
function displayWeather(data) {
  const cityName = document.getElementById("city-name");
  const tempElement = document.getElementById("temp");
  const descElement = document.getElementById("desc");
  const humidityElement = document.getElementById("humidity");
  const iconElement = document.getElementById("weather-icon");

  // Extract values and update HTML text content
  cityName.textContent = data.name;
  tempElement.textContent = `Temperature: ${Math.round(data.main.temp)} °C`;
  descElement.textContent = `Condition: ${data.weather[0].description}`;
  humidityElement.textContent = `Humidity: ${data.main.humidity}%`;

  // 2. Get the icon code from the API response (e.g., "10d")
  const iconCode = data.weather[0].icon;

  // 3. Set the image source to OpenWeatherMap's icon URL and make it visible
  iconElement.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  iconElement.alt = data.weather[0].description;
  iconElement.style.display = "block"; // Show the image now that we have data
}

//1 step take imort key
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
console.log("Loaded API Key:", apiKey); //

//2.weather api key fetch from url with key
async function getWeatherData(city) {
  try {
    // 1. First fetch: Get coordinates for the city
    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`,
    );
    console.log(geoResponse);

    if (!geoResponse.ok) {
      throw new Error(`Geocoding failed with status : ${geoResponse.status}`);
    }

    const geoData = await geoResponse.json(); //as json return promise obj so we have to define await so it convert into arr data response
    if (geoData.length === 0) {
      throw new Error("Location not found! Please check the city name.");
    }
    console.log(geoData);

    // // Grab the latitude and longitude from the first result (index 0)
    // const lat = geoData[0].lat;
    // const lon = geoData[0].lon;
    // console.log(`Coordinates found-> Lat: ${lat}, Lon: ${lon}`);

    // 1. Use .find() to look for an exact name match (remove the || geoData[0] part!)
    const matchedLocation = geoData.find(
      (item) => item.name.toLowerCase() === city.toLowerCase(),
    );

    // 2. If no exact match is found, matchedLocation will be undefined, triggering this error
    if (!matchedLocation) {
      throw new Error(
        `City "${city}" not found. Try searching for a specific city like "Mumbai" or "New Delhi".`,
      );
    }
    const lat = matchedLocation.lat;
    const lon = matchedLocation.lon;
    console.log(
      `Matched Location: ${matchedLocation.name}, Lat: ${lat}, Lon: ${lon}`,
    );

    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
    );

    // console.log(weatherResponse);

    if (!weatherResponse.ok) {
      throw new Error(
        `Weather fetch failed with status: ${weatherResponse.status}`,
      );
    }
    const weatherData = await weatherResponse.json();
    console.log("Full Industrial Weather Data Object:", weatherData);
    displayWeather(weatherData);
    // data.map(async (nm) => {
    //   //   console.log("map arr: ", nm.name);
    //   console.log(
    //     "Country: ",
    //     nm.country,
    //     "state: ",
    //     nm.state,
    //     "latitude: ",
    //     nm.lat,
    //     "longitude: ",
    //     nm.lon,
    //   );
    // });
  } catch (error) {
    console.error("An error occurred:", error.message);
    document.getElementById("city-name").textContent = "⚠️ Error";
    document.getElementById("temp").textContent = error.message;
    document.getElementById("desc").textContent = "";
    document.getElementById("humidity").textContent = "";

    // Hide the icon if an error occurs
    document.getElementById("weather-icon").style.display = "none";
  }
}

// 4. Event Listener for the Search Form
const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent page reload on form submit
  const cityName = cityInput.value.trim();

  if (cityName) {
    getWeatherData(cityName);
    cityInput.value = ""; // Clear input after searching
  }
});

getWeatherData("Tokyo");
