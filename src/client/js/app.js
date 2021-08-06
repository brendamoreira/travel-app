/* Global Variables */

// Create a new date instance dynamically with JS
function formattedDate(someDate) {
  let date = new Date(someDate);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return `${year}-${month}-${day}`;
}
// countdown
function countdown(date) {
  let today = new Date();
  let tripDay = new Date(date);
  let diffTime = tripDay.getTime() - today.getTime();
  let diffDays = diffTime / (1000 * 3600 * 24);
  return diffDays;
}
// formats destination for image api
function formatForImgSearch(destination) {
  return destination.trim().split(" ").join("+");
}

// callback for click listener
function performAction() {
  // access values from user
  const destination = document.getElementById("destination").value;
  const date = document.getElementById("tripDate").value;
  if (!city || !date) {
    alert("Please fill all the fields");
    return;
  }
  // chaining promises
  getLocation(destination).then(function (data) {
    let lat = data.postalCodes[0].lat;
    let lon = data.postalCodes[0].lng;
    let city = data.postalCodes[0].placeName;
    let country = data.postalCodes[0].countryCode;
    postData("/api/journal", { lat, lon, city, country, date }).then(
      updateErase()
    );
    getWeatherForecast(lat, lon, countdown(date)).then(function (data) {
      let maxTemp = data[data.length - 1].max_temp;
      let minTemp = data[data.length - 1].min_temp;
      console.log(maxTemp, minTemp);
      document.getElementById("max_temp").innerHTML = maxTemp;
      document.getElementById("min_temp").innerHTML = minTemp;
    });
    getImage(formatForImgSearch(destination)).then(function (images) {
      if (!images.hits.length) {
        return;
      }
      let img = images.hits[0].previewURL;
      document.getElementById("image").setAttribute("src", img);
      console.log(images);
    });
  });
}
function updateErase() {
  updateUI();
  document.getElementById("destination").value = "";
  document.getElementById("tripDate").value = "";
}
// Get location from API
const getLocation = async (city) => {
  const username = "brendamoreira";
  const baseURL = `http://api.geonames.org/postalCodeSearchJSON?placename=${city}&maxRows=10&username=${username}`;
  try {
    const res = await fetch(baseURL);
    const data = await res.json();
    console.log(data, "****");
    if (res.status !== 200) {
      alert(data.message);
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Get weather from API
const getWeatherForecast = async (lat, lon, days) => {
  const weatherApiKey = "";
  const baseUrl = `http://api.weatherbit.io/v2.0/forecast/daily?days=${days}&lat=${lat}&lon=${lon}&key=${weatherApiKey}`;
  try {
    const res = await fetch(baseUrl);
    const { data } = await res.json();
    if (res.status !== 200) {
      alert(data.message);
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Get image from API
const getImage = async (place) => {
  const imageApiKey = "";
  const urlBase = `https://pixabay.com/api/?key=${imageApiKey}&q=${place}&image_type=photo&safesearch=true`;
  try {
    const res = await fetch(urlBase);
    const images = await res.json();
    if (res.status !== 200) {
      alert(images.message);
      throw new Error(data.message);
    }
    return images;
  } catch (error) {
    console.log(error);
  }
};

// post data
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    console.log(response, "**");
    const newData = await response.json();
    console.log(newData, "*");
    return newData;
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

// dynamic UI update
const updateUI = async () => {
  const request = await fetch("/api/journal/latest");
  try {
    const entry = await request.json();
    console.log(entry);
    document.getElementById("date").innerHTML = "Date " + entry.date;
    document.getElementById("city").innerHTML = entry.city;
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

export default performAction;
export { formattedDate };
