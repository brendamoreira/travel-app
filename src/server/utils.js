// countdown
module.exports.countdown = (date) => {
  let today = new Date();
  let tripDay = new Date(date);
  let diffTime = tripDay.getTime() - today.getTime();
  let diffDays = diffTime / (1000 * 3600 * 24);
  return Math.ceil(diffDays);
}

// formats destination for image api
module.exports.formatForImgSearch = (destination) => {
  return destination.trim().split(" ").join("+");
}
