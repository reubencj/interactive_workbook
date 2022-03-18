import React from "react";

const Textbox = (props) => {
  return (
    <div className="mb-3">
      <label className="Form-label">{props.label}</label>
      <input
        type={props.type ? props.type : "text"}
        name="{props.name}"
        onChange={(e) => props.setState(e.target.value)}
        className="form-control"
        value={props.value}
      />
    </div>
  );
};

export default Textbox;
