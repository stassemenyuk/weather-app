import React from 'react';
import WeatherBlock from '../weather-block/WeatherBlock';

import './WeatherPanel.css';

export default function WeatherPanel(props) {
  const blocks = props.names.map((item, index) => {
    return <WeatherBlock onRemove={() => props.onRemove(index)} name={item} key={index} />;
  });
  return (
    <div className="weather-panel">
      <div className="weather-panel__title">
        <div className="title__text">{props.title}</div>
        <div className="title_clearBtn">
          <button onClick={props.onClear} className="btn btn-danger">
            Clear list
          </button>
        </div>
      </div>
      <div className="weather-panel__blocks">{blocks}</div>
    </div>
  );
}
