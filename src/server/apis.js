const dotenv = require("dotenv");
dotenv.config();

const fetch = require("node-fetch");

// Get location from API
module.exports.getLocation = async (city, country) => {
  const username = process.env.USERNAME;
  const baseURL = `http://api.geonames.org/postalCodeSearchJSON?placename=${city}&coutry=${country}&maxRows=10&username=${username}`;
  try {
    const res = await fetch(baseURL);
    const data = await res.json();
    console.log(data, "****");
    if (res.status !== 200) {
      throw new Error(res.message);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Get weather from API
module.exports.getWeatherForecast = async (lat, lon, days) => {
  const weatherApiKey = process.env.WEATHER_API_KEY;
  const baseUrl = `http://api.weatherbit.io/v2.0/forecast/daily?days=${parseInt(days)}&lat=${lat}&lon=${lon}&key=${weatherApiKey}`;
  try {
    const res = await fetch(baseUrl);
    const { data } = await res.json();
    if (res.status !== 200) {
        throw new Error(res.message);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Get image from API
module.exports.getImage = async (place) => {
  const imageApiKey = process.env.IMAGE_API_KEY;
  const urlBase = `https://pixabay.com/api/?key=${imageApiKey}&q=${place}&image_type=photo&safesearch=true`;
  try {
    const res = await fetch(urlBase);
    const images = await res.json();
    if (res.status !== 200) {
      throw new Error(data.message);
    }
    return images;
  } catch (error) {
    console.log(error);
  }
};
