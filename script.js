const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const currentWeatherItemsElement = document.getElementById(
  "current-weather-items"
);
const timeZone = document.getElementById("time-zone");
const countryElement = document.getElementById("country");
const weatherForecastElement = document.getElementById("weather-forecast");
const currentTempElement = document.getElementById("current-temp");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const API_KEY = "1a04e729a75b814799f9ee276b91d4ba";

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";

  timeElement.innerHTML =
    (hoursIn12HrFormat < 10 ? "0" + hoursIn12HrFormat : hoursIn12HrFormat) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    `<span id="am-pm">${ampm}</span>`;

  dateElement.innerHTML = days[day] + "," + date + " " + months[month];
}, 1000);

getWeatherData();

function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {
    let { latitude, longitude } = success.coords;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        showWeatherData(data);
      });
  });
}

function showWeatherData(data) {
  let { feels_like, humidity, pressure, temp, temp_max, temp_min } = data.main;
  let wind_speed = data.wind.speed;
  let sunrise = data.sys.sunrise;
  let sunset = data.sys.sunset;

  timeZone.innerHTML = data.timezone;
  countryElement.innerHTML = data.coord.lat + "N" + data.coord.lon + "E";

  currentWeatherItemsElement.innerHTML = `<div class="weather-item">
              <div>Humidity</div>
              <div>${humidity}</div>
            </div>
            <div class="weather-item">
              <div>Pressure</div>
              <div>${pressure}</div>
            </div>
            <div class="weather-item">
              <div>Wind speed</div>
              <div>${wind_speed}</div>
            </div>
            <div class="weather-item">
              <div>Sun rise</div>
               <div>${window.moment(sunrise * 1000).format("HH:mm a")}</div>
            </div>
            <div class="weather-item">
              <div>Sunset</div>
              <div>${window.moment(sunset * 1000).format("HH:mm a")}</div>
            </div>`;
}
