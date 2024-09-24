import React from "react";
import "./uploader.css";


const UploadFile = ({ file }) => {
  return (
    <li className="list-group-item list-group-item-action">
      <div className="d-flex justify-content-between ">
        <div>
          {" "}
          <div className="upload-file__name">{file.name}</div>
          <div className="upload-file__progress-bar">
            <div
              className="upload-file__upload-bar"
              style={{ width: file.progress + "%" }}
            />
            <div className="upload-file__percent">{file.progress}%</div>
          </div>{" "}
        </div>
      </div>
    </li>
  );
};

export default UploadFile;
