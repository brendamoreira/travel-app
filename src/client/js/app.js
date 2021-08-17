// import functions
import { formattedDate, tripDays } from "./utils";

// callback for click listener
function performAction() {
  // access values from user
  const destinationCity = document.getElementById("destinationCity").value;
  const destinationCountry =
    document.getElementById("destinationCountry").value;
  const startDate = document.getElementById("tripDateFrom").value;
  const finishDate = document.getElementById("tripDateTo").value;

  if (!destinationCity || !destinationCountry || !startDate || !finishDate) {
    alert("Please fill all the fields");
    return;
  }
  // chaining promises

  postData("/api/journal", {
    city: destinationCity,
    country: destinationCountry,
    startDate,
    finishDate,
    tripDays: tripDays(startDate, finishDate),
  }).then(updateErase);
}

// dynamic UI update
const updateUI = (entry) => {
  createContainer(entry);
  document.getElementById(`startDate-${entry.id}`).innerHTML = "From " + entry.startDate;
  document.getElementById(`finishDate-${entry.id}`).innerHTML = "To " + entry.finishDate;
  document.getElementById(`city-${entry.id}`).innerHTML = entry.city;
  document.getElementById(`tripDays-${entry.id}`).innerHTML = "Duration " + entry.tripDays + "days";
  document.getElementById(`maxTemp-${entry.id}`).innerHTML = entry.maxTemp + "ºC";
  document.getElementById(`minTemp-${entry.id}`).innerHTML = entry.minTemp + "ºC";
  document.getElementById(`img-${entry.id}`).setAttribute("src", entry.img);
};

// creates new html dynamically
function createContainer(entry) {
  const container = document.createElement("li");
  container.setAttribute("class", "entry-info-container");
  for (let key in entry) {
    if (key != "id" && key != "img") {
      let el = document.createElement("div");
      el.setAttribute("id", `${key}-${entry.id}`);
      container.appendChild(el);
    }
    if (key === "img") {
      let el = document.createElement("img");
      el.setAttribute("id", `${key}-${entry.id}`);
      container.appendChild(el);
    }
  }
  document.getElementById("entryHolder").appendChild(container);
}

function updateErase(entry) {
  updateUI(entry);
  document.getElementById("destinationCity").value = "";
  document.getElementById("destinationCountry").value = "";
  document.getElementById("tripDateFrom").value = "";
  document.getElementById("tripDateTo").value = "";
}

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
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

export default performAction;
export { formattedDate };
