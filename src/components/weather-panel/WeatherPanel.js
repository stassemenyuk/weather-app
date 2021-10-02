import React from 'react';
import WeatherBlock from '../weather-block/WeatherBlock';

import './WeatherPanel.css';

export default function WeatherPanel(props) {
  const blocks = props.names.map((item, index) => {
    return <WeatherBlock onRemove={() => props.onRemove(index)} name={item} key={index} />;
  });
  return (
    <div className="weather-panel">
      <div className="weather-panel__title">{props.title}</div>
      <div className="weather-panel__blocks">{blocks}</div>
    </div>
  );
}
