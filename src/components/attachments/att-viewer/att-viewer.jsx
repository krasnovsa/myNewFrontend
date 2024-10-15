import React, { useState } from "react";
import AttExplorer from "../att-explorer/att-explorer";
import ImageViewer from "../image-viewer/image-viewer";
import "./styles.css"; // Импортируем стили

const AttViewer = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const files = [
    {
      Id: 1,
      name: "Folder 1",
      children: [
        {
          Id: 2,
          name: "image1.jpg",
          path: "http://localhost:3000/api/att/getFile?fileName=51edf82c-4d4a-45a6-b812-882c7ed22393.jpg",
        },
        {
          Id: 3,
          name: "image2.jpg",
          path: "http://localhost:3000/api/att/getFile?fileName=cc946d3e-9407-46b1-a278-69e84388170e.jpg",
        },
      ],
    },
    {
      Id: 4,
      name: "Folder 2",
      children: [
        {
          Id: 5,
          name: "Subfolder 1",
          children: [
            {
              Id: 7,
              name: "image3.jpg",
              path: "http://localhost:3000/api/att/getFile?fileName=3e946d3e-9407-46b1-a278-69e84388170e.jpg",
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="att-viewer-container">
      <div className="att-explorer">
        <AttExplorer files={files} onImageSelect={handleImageSelect} />
      </div>
      <div className="image-viewer">
        <ImageViewer image={selectedImage} />
      </div>
    </div>
  );
};

export default AttViewer;
