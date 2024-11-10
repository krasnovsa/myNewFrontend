import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getServer } from "../../../api/getServer";
import "./styles.css"; // Импортируем стили

const { SERVER } = getServer();

const ImageViewer = ({ att }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (att) {
      setIsLoading(true);
    }
  }, [att]);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div>
      {att ? (
        <>
          {att.notValid && (
            <div className="alert alert-danger" role="alert">
              Файл не действителен
            </div>
          )}
          {isLoading && <div>Loading...</div>}
          <img
            src={`${SERVER}/api/att/getFile?fileName=${att.hashFileName}`}
            alt="Selected"
            style={{
              maxWidth: "100%",
              cursor: "pointer",
              display: isLoading ? "none" : "block",
            }}
            onClick={handleImageClick}
            onLoad={handleImageLoad}
          />
          {isModalOpen && (
            <div className="modal" onClick={handleCloseModal}>
              <span className="close">&times;</span>
              <img
                className="modal-content"
                src={`${SERVER}/api/att/getFile?fileName=${att.hashFileName}`}
                alt="Selected"
                onLoad={handleImageLoad}
              />
            </div>
          )}
          <div className="alert alert-info" role="alert">
            <p>Название файла: {att.fName} </p>
            <p>Дата создания: {att.dateCreated}</p>
          </div>
        </>
      ) : (
        <p>No image selected</p>
      )}
    </div>
  );
};

ImageViewer.propTypes = {
  att: PropTypes.shape({
    notValid: PropTypes.bool,
    hashFileName: PropTypes.string,
    fName: PropTypes.string,
    dateCreated: PropTypes.string,
  }),
};

export default ImageViewer;
