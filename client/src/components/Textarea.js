import React from "react";

const Textarea = (props) => {
  return (
    <div className="mb-3">
      <label className="Form-label">{props.label}</label>
      <textarea
        name="{props.name}"
        onChange={(e) => props.setState(e.target.value)}
        className="form-control"
        value={props.value}
        rows="3"
      ></textarea>
    </div>
  );
};

export default Textarea;
