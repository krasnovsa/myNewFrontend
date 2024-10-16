import React, { useState } from "react";
import { getServer } from "../../../api/getServer";
import "./styles.css"; // Импортируем стили

const { SERVER } = getServer();

const ImageViewer = ({ att }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {att ? (
        <>
          <img
            src={`${SERVER}/api/att/getFile?fileName=${att.hashFileName}`}
            alt="Selected"
            style={{ maxWidth: "100%", cursor: "pointer" }}
            onClick={handleImageClick}
          />
          {isModalOpen && (
            <div className="modal" onClick={handleCloseModal}>
              <span className="close">&times;</span>
              <img
                className="modal-content"
                src={`${SERVER}/api/att/getFile?fileName=${att.hashFileName}`}
                alt="Selected"
              />
            </div>
          )}
        </>
      ) : (
        <p>No image selected</p>
      )}
    </div>
  );
};

export default ImageViewer;
