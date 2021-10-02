import React, { useState } from 'react';
import WeatherPanel from '../weather-panel/WeatherPanel';
import SearchPanel from '../searchPanel/SearchPanel';

import './WeatherPage.css';

export default function WeatherPage() {
  const [names, setNames] = useState(['London', 'Berlin', 'Madrid', 'Kyiv']);
  const [title, setTitle] = useState('Your list');

  function findCityByName(name, add) {
    if (name === '') {
      return;
    }
    if (!add) {
      setNames([name]);
      setTitle(`Weather in ${name}`);
    } else {
      setNames((prev) => [name, ...prev]);
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
        <WeatherPanel onClear={clearList} onRemove={removeItem} names={names} title={title} />
      </div>
    </div>
  );
}
