
import React, { useState } from 'react';

var x = 0;

const api = {
  key: "1c2a5ef864cb19a37bb64bb35ec89f01",
  base: "https://api.openweathermap.org/data/2.5/"

}
function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  if(x==0){
    x=1;
  fetch(`${api.base}weather?q=Islamabad&units=metric&APPID=${api.key}`)
  .then(res => res.json())
  .then(result => {
    setWeather(result);
  });
}
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const datebuilder = (d) =>{
  let date = String(new window.Date())
  date = date.slice(3,15)
  return date}


  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
     <main>
      <div className="search-box">
        <input
         type="text"
         className="search-bar"
         placeholder="Search..."
         onChange={e => setQuery(e.target.value)}
         value = {query}
         onKeyPress={search}
        />
      </div>
      {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
        <div className="location">{weather.name} , {weather.sys.country} </div>
        <div className="date">{datebuilder(new Date())}</div>
      </div>
      <div className="weather-box">
        <div className="temp">
          {Math.round(weather.main.temp)}°c
        </div>
        <div className="weather">{weather.weather[0].main}</div>
      </div>
        </div>
      ) : ('')}
      
     </main>
    </div>
  );
}

export default App;