import React, { useState } from "react";
import "./styles.css"; // Импортируем стили

const AttExplorer = ({ files, onImageSelect }) => {
  const [selectedId, setSelectedId] = useState(null);

  const handleFileClick = (file) => {
    setSelectedId(file.Id);
    if (!file.children) {
      onImageSelect(file.hashFileName);
    }
  };

  const renderFiles = (files) => {
    return files.map((file) => (
      <React.Fragment key={file.Id}>
        <li
          onClick={() => handleFileClick(file)}
          className={selectedId === file.Id ? "selected" : ""}
        >
          {file.fName}
        </li>
        {file.children && <ul>{renderFiles(file.children)}</ul>}
      </React.Fragment>
    ));
  };

  return (
    <div>
      <h3>File Explorer</h3>
      <ul>{renderFiles(files)}</ul>
    </div>
  );
};

export default AttExplorer;