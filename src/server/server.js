// Setup empty JS object to act as endpoint for all routes
const projectData = {};
let id = 1;
// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
app.use(express.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("dist"));
//
const api = require("./apis");
const utils = require("./utils");

// Setup Server
const port = 8000;
const server = app.listen(port, function listening() {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
});

app.post("/api/journal", async function (req, res) {
  const { city, country, startDate, finishDate } = req.body;
  const location = await api.getLocation(city, country);

  let lat = location.postalCodes[0].lat;
  let lon = location.postalCodes[0].lng;

  const weather = await api.getWeatherForecast(
    lat,
    lon,
    utils.countdown(startDate)
  );
  let maxTemp = weather.length ? weather[weather.length - 1].max_temp : null;
  let minTemp = weather.length ? weather[weather.length - 1].min_temp : null;
  const images = await api.getImage(utils.formatForImgSearch(city));

  let img = images.hits.length ? images.hits[0].previewURL : "";
  let trip = {
    id,
    city,
    country,
    startDate,
    finishDate,
    lat,
    lon,
    maxTemp,
    minTemp,
    img,
  };
  projectData[id] = trip;
  id += 1;
  res.send(trip);
});

app.get("/api/journal/latest", function (req, res) {
  res.send(projectData[id - 1] || {});
});
