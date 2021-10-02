import React, { useState } from 'react';
import WeatherPanel from '../weather-panel/WeatherPanel';
import SearchPanel from '../searchPanel/SearchPanel';

import './WeatherPage.css';

export default function WeatherPage() {
  const [names, setNames] = useState(['London', 'Berlin', 'Madrid', 'Kyiv']);
  const [title, setTitle] = useState('Your list');

  function findCityByName(name, add) {
    if (!add) {
      setNames([name]);
      setTitle(`Weather in ${name}`);
    } else {
      setNames((prev) => [...prev, name]);
      setTitle('Your list');
    }
  }

  function clearList() {
    setNames([]);
  }

  function removeItem(i) {
    setNames((prev) => {
      return [...prev.slice(0, i), ...prev.slice(i + 1)];
    });
  }

  return (
    <div className="weather-app">
      <div className="container">
        <div className="warning-text">
          This web-app was made by Stas Semenyuk using{' '}
          <a href="https://openweathermap.org/api" target="blank">
            OpenWeatherMap Api
          </a>
        </div>
        <SearchPanel findCity={findCityByName} />
        <WeatherPanel onRemove={removeItem} names={names} title={title} />
        <button onClick={clearList} className="btn btn-danger">
          Clear list
        </button>
      </div>
    </div>
  );
}
