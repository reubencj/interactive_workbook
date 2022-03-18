import React from "react";

const Selection = (props) => {
  return (
    <div className="mb-3">
      <label htmlFor={props.name}>{props.label}</label>
      <select
        name={props.name}
        className="form-select"
        onChange={(e) => props.setState(e.target.value)}
        value={props.value}
      >
        {props.options.map((option, index) => {
          return (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Selection;
