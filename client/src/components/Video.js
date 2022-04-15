import React from "react";

const Video = (props) => {
  return (
    <div className="embed-responsive embed-responsive-16by9">
      <iframe
        className="embed-responsive-item"
        src={`https://www.youtube.com/embed/${props.youtube_id}`}
        title="chapter video"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Video;
