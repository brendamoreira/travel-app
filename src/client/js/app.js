/* Global Variables */

// Create a new date instance dynamically with JS
function getToday() {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return `${year}-${month}-${day}`;
}

// callback for click listener
function performAction() {
  // access values from user
  const city = document.getElementById("city").value;
  const date = document.getElementById("tripDate").value;
  if (!city || !date) {
    alert("Please fill all the fields");
    return;
  }
  // chaining promises
  getWeather(city).then(function (data) {
    postData("/api/journal", {
      lat: data.postalCodes[0].lat,
      long: data.postalCodes[0].lng,
      city: data.postalCodes[0].placeName,
      country: data.postalCodes[0].countryCode,
      date: date,
    }).then(updateErase());
  });
}
function updateErase() {
  updateUI();
  document.getElementById("city").value = "";
  document.getElementById("tripDate").value = "";
}
// Get weather from API
const getWeather = async (city) => {
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
export { getToday };
