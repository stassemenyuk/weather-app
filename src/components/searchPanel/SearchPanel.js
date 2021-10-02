import React, { useState } from 'react';

import './SearchPanel.css';

export default function SearchPanel(props) {
  const [input, setInput] = useState('');
  const [add, setAdd] = useState(true);
  return (
    <div className="search-panel">
      <div className="search-panel__title">Write down the name of the city</div>
      <form
        className="search-form"
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          setInput('');
          setAdd(true);
          props.findCity(input, add);
        }}>
        <input
          className="form-control"
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <div className="radio-input">
          <div className="form-check">
            <input
              className="form-check-input"
              onChange={() => {
                setAdd((prev) => !prev);
              }}
              checked={!add}
              type="radio"
              id="choice2"
              name="contact"
              value="only"></input>
            <label className="form-check-label" htmlFor="choice2">
              Search <b>only</b> for this city
            </label>
          </div>
          <div className="form-check">
            <input
              onChange={() => {
                setAdd((prev) => !prev);
              }}
              className="form-check-input"
              checked={add}
              type="radio"
              id="choice1"
              name="contact"
              value="add"></input>
            <label className="form-check-label" htmlFor="choice1">
              Add City to the list
            </label>
          </div>
        </div>

        <div className="submit-btn">
          <input type="submit" value="submit" className="btn btn-success" />
        </div>
      </form>
    </div>
  );
}
