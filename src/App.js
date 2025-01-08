import React, { useEffect, useState } from 'react'

const App = () => {
 
  const[data, setdata]=useState('');
  const[weather, setweather]=useState({});
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setdata(data.message));
  }, []);


  const search=event=>{
    if(event.key==="Enter"){
        fetch(`${api.base}=${data}&units=imperial&APPID=${api.key}`)
        .then(res=>res.json())
        .then(result=>{
          setdata('');
          setweather(result)});
          console.log(weather);
    }

    }
  

  const datebuilder=(d)=>{
    let months=["january","February","March","April","May","June","July","August","September","October","November","December"];
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();
    return ` ${day} ${date} ${month} ${year} `
  }
  return (
    <div className='App'>
      <div className="search">
        <input
        type='text'
        className='search-bar'
        placeholder='Enter the location'
        onChange={e=> setdata(e.target.value)}
        value={data}
        onKeyPress={search}
        />
      </div>
      {(typeof weather.main !="undefined")?(
    <div className="container">
      <div className="top">
        <div className="location">
          <p>{weather.name},{weather.sys.country}</p>
          <div className="date">{datebuilder(new Date())}</div>
        </div>
        <div className="temp">
          <h1 style={{fontSize:'25px'}}>{Math.round(weather.main.temp)}°F</h1>
        </div>
        <div className="description">
          <p>{weather.description}</p>
        </div>
      </div>
      <div className="bottom">
        <div className="feels">
          <p className='bold'>{weather.main.temp_max}°F</p>
          <p>Feels like</p>
        </div>
        <div className="humidity">
          <p className='bold'>{weather.main.humidity}%</p>
          <p>Humidity</p>
        </div>
        <div className="wind">
        <p className='bold'>{weather.wind.speed}MPH</p>
        <p>Wind Speed</p>
        </div>
      </div>
      </div>
      ):('')}
  </div>
  );
      }

export default App
