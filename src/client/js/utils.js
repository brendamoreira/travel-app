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

// counts the duration of the trip
function tripDays(from, to) {
  let beginning = new Date(from);
  let ending = new Date(to);
  let diffTime = ending.getTime() - beginning.getTime();
  let diffDays = diffTime / (1000 * 3600 * 24);
  return diffDays;
}

export { formattedDate, tripDays };
