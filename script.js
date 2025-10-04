// let date = new Date();
// let day = date.getDate();
// let month = date.getMonth() + 1;
// let year = date.getFullYear();
// let hours = date.getHours();
// let minutes = date.getMinutes();
// let seconds = date.getSeconds();

// console.log(`Date: ${day}/${month}/${year}`);

const place = document.getElementById("location-name");
const temp = document.getElementById("temperature");
const description = document.getElementById("description");
const button = document.getElementById("weather-form");
button.addEventListener("submit", handleForm);

const FetchResults = async (kidhar) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=f7004a0cf1dc496497c162215250410&q=${kidhar}`;
  const response = await fetch(url);
  data = await response.json();
  //   console.log(data);

  let city = data.location.name;
  let state = data.location.region;
  let country = data.location.country;

  let samay = data.location.localtime;
  let date = samay.split(" ")[0].split("-")[2];
  let month = samay.split(" ")[0].split("-")[1];
  let year = samay.split(" ")[0].split("-")[0];
  let hours = samay.split(" ")[1].split(":")[0];
  let minutes = samay.split(" ")[1].split(":")[1];
  let kyahai = "";
  if (hours > 12) {
    kyahai = "PM";
    hours = hours - 12;
  } else {
    kyahai = "AM";
  }

  let temperature = data.current.temp_c;
  let feelsLike = data.current.feelslike_c;
  let condition = data.current.condition.text;
  let conditionIcon = data.current.condition.icon;

  place.innerHTML = `${city}, ${state}, ${country}`;
  temp.innerHTML = `${temperature} &deg;C (Feels like: ${feelsLike} &deg;C)`;
  description.innerHTML = `Currently at: ${hours}:${minutes} ${kyahai} (${date}/${month}/${year})<br>It is ${condition} <img src="${conditionIcon}" style="height: 35px; width: 35px;" alt="icon">`;
};

function handleForm(event) {
  event.preventDefault();
  let locationInput = document.getElementById("location");
  FetchResults(locationInput.value);
}
