import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = (props) => {
  return (
    <div className="mb-3">
      <label className="Form-label">{props.label}</label>
      <ReactQuill theme="snow" value={props.value} onChange={props.setValue} />
    </div>
  );
};

export default TextEditor;
