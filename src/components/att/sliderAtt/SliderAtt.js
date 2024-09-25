import React, { useState, useEffect } from "react";
import CarouselAtt from "./CarouselAtt";
import { getAttList, downloadFile, removeAtt } from "../../../api/apiAtt";

import UploadForm from "../uploader/UploadForm";
import { File } from "react-bootstrap-icons";
import { fileType, trimFName } from "../fileType";
import { isAuthenticated, checkWebRole } from "../../../auth";
import {ThreeDots} from "react-loader-spinner";
import "./sliderAtt.css";
import { Switch } from "react-router";
import { getServer } from "../../../api/getServer";

const {SERVER} = getServer()

function SliderAtt(props) {
  const { table, keyValue } = props;
  const [attList, setAttList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState({});
  const [showCarousel, setShowCarousel] = useState(false);
  const [requeryTrigger, setRequeryTrigger] = useState(false);

  const {
    user: { _id = null },
    webRoles,
    token,
  } = isAuthenticated();

  useEffect(() => {
    setIsLoading(true);
    getAttList(token, _id, table, keyValue, -1, 0)
      .then((result) => {
        if (result.error || !result.length) {
          setAttList([]);
          return;
        }
        console.log("attlist", result);
        setAttList(result);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [, table, keyValue, requeryTrigger]);

  const onImageClickHandler = (file) => (e) => {
    if (file.Id !== selectedFile.Id) {
      setSelectedFile(file);
      return;
    }
    setShowCarousel(true);
  };

  const changeTrigger = () => {
    setRequeryTrigger(!requeryTrigger);
  };

  const getIconPath = (file) => {
    switch (fileType(file)) {
      case "image":
        return file.fileURL;
      case "pdf":
        return `/pdf-icon.png`;
      case "txt":
        return `/txt-file.png`;
    }
  };

  return (
    <>
      <div>
        {
          <div className="slider">
            <section className="slider-card">
            <UploadForm
          table={table}
          keyValue={keyValue}
          withUploadList={true}
          withAddFolder={false}
          changeTrigger={() => {
            setRequeryTrigger(!requeryTrigger);
          }}
        />
              
              
              {isLoading && (
              <ThreeDots
                type="Puff"
                color="#007bff"
                height={70}
                width={70}
                timeout={5000} //3 secs
              />
            )}


              {attList?.length>0?attList
                .filter((file) => {
                  return (
                    fileType(file) === "image" ||
                    fileType(file) === "pdf" ||
                    fileType(file) === "txt"
                  );
                })
                .map((file, i) => {
                  return (
                    <div
                      key={file.Id}
                      onClick={onImageClickHandler(file)}
                      className={`slider-card-item ${
                        file.notValid ? " image-wrap" : ""
                      }${file.Id === selectedFile?.Id ? " active" : ""}`}
                    >
                      <img
                        className={`slider-image  `}
                        src={`${SERVER}${getIconPath(file)}`}
                        alt={file.fName}
                      />
                      <small>{trimFName(file.fName)}</small>
                    </div>
                  );
                }):<div className={`slider-card-item`} >
                  пока нет вложений
                  </div>}
                  
            </section>
          </div>
        }
        
      </div>

      {showCarousel === true && (
        <div>
          <CarouselAtt
            table={table}
            keyValue={keyValue}
            curFileURL={selectedFile.fileURL}
            closeCarousel={() => setShowCarousel(false)}
            onDeleteHandler={changeTrigger}
          />
        </div>
      )}
    </>
  );
}

export default SliderAtt;
