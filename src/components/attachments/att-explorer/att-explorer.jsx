import React, { useState } from "react";
import "./styles.css"; // Импортируем стили
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faFile } from "@fortawesome/free-solid-svg-icons";

const AttExplorer = ({ files, onAttSelect }) => {
  const [selectedId, setSelectedId] = useState(null);

  const handleFileClick = (file) => {
    setSelectedId(file.Id);
    if (!file.children) {
      onAttSelect(file);
    }
  };

  const renderFiles = (files) => {
    return files.map((file) => (
      <React.Fragment key={file.Id}>
        
        <li
          onClick={() => handleFileClick(file)}
          className={`${selectedId === file.Id ? "selected" : ""} ${
            file.notValid == 0 ? "" : "invalid"
          }`}
        >
          <FontAwesomeIcon icon={file.isFolder ? faFolder : faFile} />
          {file.fName}
        </li>
        {file.children && <ul>{renderFiles(file.children)}</ul>}
      </React.Fragment>
    ));
  };

  return (
    <div>
      <p>Menu</p>
      <ul className="file-list">{renderFiles(files)}</ul>
    </div>
  );
};

export default AttExplorer;
