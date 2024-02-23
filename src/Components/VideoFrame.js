import React from "react";

const VideoFrame = ({ src }) => {
  return (
    <iframe
      width="320"
      height="180"
      src={src}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
};

export default VideoFrame;
