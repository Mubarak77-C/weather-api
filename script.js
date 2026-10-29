console.log("hi");

async function weatherApi() {
  try {
    const response = await fetch(
      "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=13fc9a099f0277743984b5a52b07a2a2",
    );
    //  console.log(response);
    const data = response.json();
    console.log(data);
    // data.map(async (nm) => {
    //   console.log("map arr: ", nm.name);
    // });
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
}

weatherApi();
