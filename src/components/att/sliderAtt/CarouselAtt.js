import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Carousel } from "react-bootstrap/";
import { getAttList, downloadFile, removeAtt } from "../../../api/apiAtt";
import { fileType } from "../fileType";
import { isAuthenticated, checkWebRole } from "../../../auth";
import Loader from "react-loader-spinner";
import ShowImage from "../ShowImage";
import ShowPdf from "../ShowPdf";
import ShowText from "../ShowText";
import "./carouselAtt.css";
import { Download, Trash, Pen } from "react-bootstrap-icons";
const SERVER = process.env.REACT_APP_SERVER;

function CarouselAtt(props) {
  const {
    table,
    keyValue,
    curFileURL = "",
    closeCarousel,
    onDeleteHandler,
  } = props;
  const [attList, setAttList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
 

  const {
    user: { _id = null },
    webRoles,
    token,
  } = isAuthenticated();

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    setIsLoading(true);
    getAttList(token, _id, table, keyValue, -1, 0)
      .then((result) => {
        if (result.error || result?.lenght === 0) {
          console.log(result);
          return setAttList([]);
        }
        console.log("attlist", result);
        setAttList(result);
        if (curFileURL === "") {
          setIndex(0);
        } else {
          setIndex(
            result
              .filter((file) => {
                return (
                  fileType(file) === "image" ||
                  fileType(file) === "txt" ||
                  fileType(file) === "pdf"
                );
              })
              .findIndex((item) => {
                return item.fileURL === curFileURL;
              })
          );
        }
      })
      .catch((err) => {
        console.log(err);
        setAttList([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [, table, keyValue, curFileURL]);

  const closePopupHandler = (e) => {
    e.stopPropagation();
    closeCarousel();
  };

  const removeClickHandler = (Id) => (e) => {
    console.log("remove", Id);
    removeAtt(token, _id, Id)().finally(() => onDeleteHandler());
    closeCarousel();
  };
  const downloadClickHandler = (Id, name) => (e) => {
    downloadFile(Id, name);
    closeCarousel();
  };
  
  return (
    <div className="popup" style={{ position: "fixed" }}>
      <div className=" popup-content">
        <button
          className="btn btn-outline-light close-button"
          style={{ position: "absolute" }}
          onClick={closePopupHandler}
        >
          X
        </button>
        {isLoading && (
          <Loader
            type="Puff"
            color="#007bff"
            height={70}
            width={70}
            timeout={5000} //3 secs
          />
        )}
        {attList.length && (
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            interval={null}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {attList
              .filter((file) => {
                return (
                  fileType(file) === "image" ||
                  fileType(file) === "txt" ||
                  fileType(file) === "pdf"
                );
              })
              .map((file, i) => {
                return (
                  <Carousel.Item key={i}>
                    {fileType(file) === "image" && (
                      <ShowImage fileURL={file.fileURL} />
                    )}
                    {fileType(file) === "pdf" && (
                      <ShowPdf fileURL={file.fileURL} />
                    )}
                    {fileType(file) === "txt" && (
                      <ShowText fileURL={file.fileURL} />
                    )}

                    <Carousel.Caption>
                      <div
                        style={{
                          opacity: 0.5,
                          backgroundColor: "#000",
                        }}
                      >
                        <small>{file.notValid && "не действительный"}</small>
                        <div className="btn-group d-flex justify-content-between">
                          <button
                            className="btn btn-sm  btn-outline-light m-1 "
                            onClick={removeClickHandler(file.Id)}
                          >
                            <Trash />
                          </button>
                          <button
                            className="btn  btn-sm btn-outline-light m-1"
                            onClick={downloadClickHandler(file.Id, file.fName)}
                          >
                            <Download />
                          </button>
                        </div>
                        <small>{file.fName}</small>
                      </div>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
          </Carousel>
        )}
      </div>
    </div>
  );
}

export default CarouselAtt;
