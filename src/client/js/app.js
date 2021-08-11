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
const updateUI = async (entry) => {
    document.getElementById("fromDate").innerHTML = "From " + entry.startDate;
    document.getElementById("city").innerHTML = entry.city;
    document.getElementById("max_temp").innerHTML = entry.maxTemp;
    document.getElementById("min_temp").innerHTML = entry.minTemp;
    document.getElementById("image").setAttribute("src", entry.img);
};
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
