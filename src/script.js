console.log("hi");

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

async function weatherApi() {
  try {
    const response = await fetch(
      "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={apiKey}",
    );
    //  console.log(response);

    const data = await response.json(); //as json return promise obj so we have to define await so it convert into arr data response
    console.log(data);

    // Grab the latitude and longitude from the first result (index 0)
    const lat = data[0].lat;
    const lon = data[0].lon;
    console.log(`Coordinates found! Lat: ${lat}, Lon: ${lon}`);

    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid={apiKey}&units=metric`,
    );

    // console.log(weatherResponse);
    const weatherData = await weatherResponse.json();
    console.log("Weather Data:", weatherData);

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
    console.error("Error", error);
    throw error;
  }
}

weatherApi();
