import React, { useEffect, useState } from 'react';

import './WeatherBlock.css';

export default function WeatherBlock(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setLoadingIndicator] = useState(false);
  const [data, setData] = useState(0);
  const [currentDate, setCurrentDate] = useState('');

  function getData(nameOfTheCity) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${nameOfTheCity}&appid=94731d9912fc64a38073a172fa1f0800`,
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setError(null);
        setLoadingIndicator(true);
        setData({
          city: data.name,
          country: data.sys.country,
          temperature: Math.floor(data.main.temp - 273) + '°C',
          feelLike: Math.floor(data.main.feels_like - 273) + '°C',
          minTemperature: Math.floor(data.main.temp_min - 273) + '°C',
          maxTemperature: Math.floor(data.main.temp_max - 273) + '°C',
          description: data.weather[0].main,
          icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          timezoneOffset: data.timezone,
        });
        setCurrentDate(
          new Date(new Date().getTime() + data.timezone * 1000).toUTCString().replace(/ GMT$/, ''),
        );
      })
      .catch(() => {
        setLoadingIndicator(true);
        setError(true);
      });
  }

  useEffect(() => {
    getData(props.name);
  }, [props.name]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(
        new Date(new Date().getTime() + data.timezoneOffset * 1000)
          .toUTCString()
          .replace(/ GMT$/, ''),
      );
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [data]);

  const {
    city,
    country,
    icon,
    temperature,
    feelLike,
    description,
    minTemperature,
    maxTemperature,
  } = data;

  if (error) {
    return (
      <div className="weather-card">
        <div className="close-btn" onClick={props.onRemove}>
          X
        </div>
        <div className="error__text">
          Something went wrong... :{'('} <br />
          Maybe you write the name wrong
        </div>
      </div>
    );
  } else if (!isLoaded) {
    return <div className="weather-card">Loading...</div>;
  } else {
    return (
      <div className="weather-card">
        <div className="close-btn" onClick={props.onRemove}>
          X
        </div>
        <div className="weather__date">{currentDate}</div>
        <div className="weather__location">
          {city} , {country}
        </div>
        <div className="weather__temperature">
          <div className="weather__temperature__icon">
            <img src={icon} alt="icon" />
          </div>
          <div className="weather__temperature__number">{temperature}</div>
        </div>
        <div className="weather__text">
          Feels like {feelLike}. {description}. Temperature today: from {minTemperature} to{' '}
          {maxTemperature}.
        </div>
      </div>
    );
  }
}
