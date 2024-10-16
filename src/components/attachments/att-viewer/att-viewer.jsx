import React, { useState, useEffect } from "react";
import AttExplorer from "../att-explorer/att-explorer";
import ImageViewer from "../image-viewer/image-viewer";
import { getAttList } from "../../../api/apiAttachments";
import organizeFiles from "./prepare-att-data";
import { isAuthenticated } from "../../../auth";
import "./styles.css"; // Импортируем стили

const AttViewer = ({ keyValue, tableName }) => {
  const { user, token } = isAuthenticated();

  const [selectedAtt, setSelectedAtt] = useState(null);
  const [files, setFiles] = useState([]);

  const handleAttSelect = (att) => {
    setSelectedAtt(att);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAttList(
          token,
          user._id,
          tableName,
          keyValue,
          -1,
          0
        );
        const organizedData = organizeFiles(data);
        setFiles(organizedData);
      } catch (error) {
        console.error("Error fetching attachment list:", error);
      }
    };

    fetchData();
  }, [keyValue, tableName, token, user._id]);

  return (
    <div className="att-viewer-container">
      <div className="att-explorer">
        <AttExplorer files={files} onAttSelect={handleAttSelect} />
      </div>
      <div className="image-viewer">
        <ImageViewer att={selectedAtt} />
      </div>
    </div>
  );
};

export default AttViewer;
