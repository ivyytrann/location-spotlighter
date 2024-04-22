import React from "react"

const VideoFrame = ({ src }) => {
  return (
    <iframe
      width="420"
      height="220"
      src={src}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  )
}

export default VideoFrame
