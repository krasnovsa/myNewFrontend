import React, { useState, useEffect } from "react";

import MainListItem from "./MainListItem";
import {ThreeDots} from "react-loader-spinner";
import "./MainList.css";
import { getAttList, downloadFile } from "../../api/apiAtt";

import { isAuthenticated, checkWebRole } from "../../auth";

import UploadForm from "./uploader/UploadForm";

function MainList(props) {
  const initPar = { Id: 0, fullRelPath: "\\" };
  const { table, keyValue, changeItem } = props;
  const [attList, setAttList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [par, setPar] = useState(initPar);
  const [prev, setPrev] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [requeryTrigger, setRequeryTrigger] = useState(false);
  const { fullRelPath, Id: parId } = par || initPar;

  const {
    user: { _id = null },
    webRoles,
  } = isAuthenticated();
  const { token } = isAuthenticated();

  useEffect(() => {
    getAttList(token, _id, table, keyValue, parId, 0)
      .then((result) => {
        console.log('att get list result', result)
        if (result.error||result.lenght===0) {
          return setAttList([]);
        }
        console.log("prev", prev);
        return setAttList(result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        changeItem({});
      });
  }, [table, keyValue, parId, requeryTrigger]);

  const onClickHandler = (att) => (e) => {
    //e.preventDefault();
    if (selectedId === att.Id) {
      if (att.aType === "Folder") {
        setPrev([...prev, par || initPar]);
        return setPar(att);
      }
    } else {
      setSelectedId(att.Id);
      changeItem(att);
    }
  };

  const backClickHandler = () => {
    setPar(prev[prev?.length - 1 || initPar]);
    setPrev(prev.filter((item, i) => i !== prev.length - 1));
  };

  const changeTrigger = () => {
    setRequeryTrigger(!requeryTrigger);
  };

  const downloadItem = (Id, fName) => {
    downloadFile(Id, fName);
  };

  return (
    <div>
      {prev?.length !== 0 && (
        <button
          className="btn btn-primary m-1 btn-sm p-1"
          onClick={backClickHandler}
        >
          Назад
        </button>
      )}

      <div className="alert alert-warning">.{fullRelPath}</div>
      <ul className="list-group mt-2 ">
        {isLoading && (
          <ThreeDots
            type="Puff"
            color="#007bff"
            height={70}
            width={70}
            timeout={5000} //3 secs
          />
        )}
        {attList?.length>0  &&
          attList.map((item) => {
            return (
              <MainListItem
                key={item.Id}
                att={item}
                onClickHandler={onClickHandler}
                isActive={item.Id == selectedId ? true : false}
                onDeleteHandler={
                  changeTrigger
                }
                onDownloadHandler={downloadItem}
              />
            );
          })}
      </ul>

      {checkWebRole(webRoles, "allowAttUpload") > 0 && (
        <UploadForm
          table={table}
          keyValue={keyValue}
          fullRelPath={fullRelPath}
          changeTrigger={changeTrigger}
        />
      )}
    </div>
  );
}

export default MainList;
