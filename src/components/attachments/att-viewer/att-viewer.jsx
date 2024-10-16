import React, { useState, useEffect } from "react";
import AttExplorer from "../att-explorer/att-explorer";
import ImageViewer from "../image-viewer/image-viewer";
import { getAttList } from "../../../api/apiAttachments";
import organizeFiles from "./prepare-att-data";
import { isAuthenticated } from "../../../auth";
import "./styles.css"; // Импортируем стили

const AttViewer = ({ productId }) => {
  const { user, token } = isAuthenticated();

  const [selectedImage, setSelectedImage] = useState(null);
  const [files, setFiles] = useState([]);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAttList(token, user._id, "Products", productId, -1, 0);
        const organizedData = organizeFiles(data);
        setFiles(organizedData);
      } catch (error) {
        console.error("Error fetching attachment list:", error);
      }
    };

    fetchData();
  }, [productId, token, user._id]);

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