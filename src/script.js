//const { error } = require("node:console");

console.log("hi");

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
console.log("Loaded API Key:", apiKey); //

async function weatherApi() {
  try {
    // 1. First fetch: Get coordinates for the city
    const geoResponse = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${apiKey}`,
    );
    console.log(geoResponse);

    if (!geoResponse.ok) {
      throw new Error(`Geocoding failed with status : ${geoResponse.status}`);
    }

    const geoData = await geoResponse.json(); //as json return promise obj so we have to define await so it convert into arr data response
    if (geoData.length === 0) {
      throw new Error("Location not found!");
    }
    console.log(geoData);

    // Grab the latitude and longitude from the first result (index 0)
    const lat = geoData[0].lat;
    const lon = geoData[0].lon;
    console.log(`Coordinates found-> Lat: ${lat}, Lon: ${lon}`);

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
    //throw error;
  }
}

weatherApi();
