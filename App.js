import react, { useState, useEffect } from "react";

let api = {
  key: "",
  base: "http://api.openweathermap.org/data/2.5/",
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

  function search() {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
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
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
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
          </div>
        ) : (
          ``
        )}
      </main>
    </div>
  );
}

export default App;
