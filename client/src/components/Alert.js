import React from "react";
const Alert = (props) => {
  return (
    <div
      className={
        props.success ? "mb-3 alert alert-success" : "mb-3 alert alert-danger"
      }
    >
      {props.label}
    </div>
  );
};

export default Alert;
