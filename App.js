import react, { useState } from "react";
import Tile from "./Tile";
let api = {
  key: "",
  base: "http://api.openweathermap.org/data/2.5/",
  lat:
    "api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}",
};

function dateBuilder(dateO) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let cDate = dateO.getDate();
  let cDay = days[dateO.getDay()];
  let cMonth = months[dateO.getMonth()];
  let year = dateO.getFullYear();

  return `${cDate} ${cDay} ${cMonth} ${year}`;
}

function App() {
  let [query, setQuery] = useState(``);
  let [weather, setWeather] = useState({});
  let [cords, setCords] = useState({});

  function search() {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((response) => response.json())
      .then((res) => {
        setWeather(res);
        setQuery(``);
        console.log(res);
      });
  }

  function coordinateSearch() {
    window.navigator.geolocation.getCurrentPosition((x) => {
      setCords({ latitude: x.coords.latitude, longitude: x.coords.longitude });
    });

    fetch(
      `${api.base}weather?lat=${cords.latitude}&lon=${cords.longitude}&units=metric&APPID=${api.key}`
    )
      .then((response) => response.json())
      .then((res) => {
        setWeather(res);
        setQuery(``);
        console.log(res);
      });
  }

  return (
    <div
      className={
        typeof weather.main !== "undefined"
          ? weather.main.temp > 16
            ? `app warm`
            : `app`
          : `app`
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-tab"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === `Enter`) search();
            }}
          />
          <span onClick={coordinateSearch}>
            <i className="fas fa-map-marker-alt"></i>
          </span>
        </div>
        {typeof weather.main != "undefined" ? (
          <div className="content-box">
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
            <div className="weather-assemble">
              <Tile
                content="Max"
                value={Math.round(weather.main.temp_max)}
                units="°C"
              />
              <Tile
                content="Min"
                value={Math.round(weather.main.temp_min)}
                units="°C"
              />
              <Tile
                content="Humidity"
                value={Math.round(weather.main.humidity)}
                units="%"
              />
              <Tile
                content="Wind speed"
                value={Math.round(weather.wind.speed)}
                units="m/s"
              />
            </div>
          </div>
        ) : (
          ``
        )}
      </main>
    </div>
  );
}

export default App;

