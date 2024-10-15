import React from "react";

const ImageViewer = ({ image }) => {
  return (
    <div>
      <h3>Image Viewer</h3>
      {image ? (
        <img src={image} alt="Selected" style={{ maxWidth: "100%" }} />
      ) : (
        <p>No image selected</p>
      )}
    </div>
  );
};

export default ImageViewer;
