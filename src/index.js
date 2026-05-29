import "./style.css";
const key = `97BGTPA2BBRRU58FFS9CP22ZT`;

let city = document.querySelector(".city");
let searchBtn = document.querySelector(".search-icon");
//LOGIC
async function getWeatherData(city) {
  let response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=${key}&contentType=json`,
  );
  let data = await response.json();

  let address = data.address;
  let datetime = data.currentConditions.datetime;
  let conditions = data.currentConditions.conditions;
  let feelsLike = data.currentConditions.feelslike;
  let humidity = data.currentConditions.humidity;
  let icon = data.currentConditions.icon;
  let temp = data.currentConditions.temp;
  let description = data.description;
  let latitude = data.latitude;
  let longitude = data.longitude;
  let sunrise = data.currentConditions.sunrise;
let sunset = data.currentConditions.sunset;

  return {
    address,
    datetime,
    conditions,
    feelsLike,
    humidity,
    icon,
    temp,
    description,
    latitude,
    longitude,
    sunrise,
    sunset
  };
}

//UI
async function showData(city) {
  let data = await getWeatherData(city);

  let weatherCard = document.querySelector(".weather-card");
  weatherCard.innerHTML = `
  <h2>${data.address}</h2>

  <h1>${Math.round((data.temp - 32) * 5 / 9)}°C
   <img 
      class="weather-icon"
      src="${iconMapping[data.icon] || "./icons/clear-day.svg"}"
      alt="weather icon"
    >
  </h1>

  <p>${data.conditions}</p>
<p>${data.description}</p>
  <div class="details">

    <div>
      <span>Feels Like</span>
      <h3>${Math.round((data.feelsLike - 32) * 5 / 9)}°C</h3>
    </div>

    <div>
      <span>Humidity</span>
      <h3>${data.humidity}%</h3>
    </div>

  </div>

  <div class="sun-section">

  <div class="sun-box">
    <img class="sun-icon" src="./icons/sunrise-22.svg" alt="">

    <div>
      <span>Sunrise</span>
      <h3>${data.sunrise}</h3>
    </div>
  </div>

  <div class="sun-box">
    <img class="sun-icon" src="./icons/sunset-5.svg" alt="">

    <div>
      <span>Sunset</span>
      <h3>${data.sunset}</h3>
    </div>
  </div>

</div>
  <div class="footer">
    <p>${data.datetime}</p>

    <p>
    ${data.latitude.toFixed(2)}°, 
    ${data.longitude.toFixed(2)}°
  </p>
  </div>
`;
}

searchBtn.addEventListener("click", () => {
  if (city.value) showData(city.value);
});

city.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (city.value) showData(city.value);
  }
});

const iconMapping = {
  "clear-day": "./icons/clear-day.svg",
  "clear-night": "./icons/clear-night.svg",

  "partly-cloudy-day": "./icons/partly-cloudy-day.svg",
  "partly-cloudy-night": "./icons/partly-cloudy-night.svg",

  cloudy: "./icons/overcast-day.svg",

  rain: "./icons/rain-day.svg",

  snow: "./icons/snow-day.svg",

  fog: "./icons/mist-day.svg",
};

showData("Delhi");
