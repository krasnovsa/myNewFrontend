import React from "react";
import { Folder, File } from "react-bootstrap-icons";
import { removeAtt } from "../../api/apiAtt";
import { isAuthenticated, checkWebRole } from "../../auth";
import { Trash, Download } from "react-bootstrap-icons";

function MainListItem(props) {
  const { aType, dateCreated, fName, fileUrl, Id, notValid } = props.att;
  const { onClickHandler, isActive, onDeleteHandler, onDownloadHandler } = props;
  const {
    user: { _id = null },
    webRoles,
  } = isAuthenticated();
  const { token } = isAuthenticated();

  const onDeleteClickHandler = (e) => {
    e.stopPropagation();
    let isConfirmed = window.confirm("Подтвердите удаление");
    if(!isConfirmed){return}
    removeAtt(token, _id, Id)().finally(()=>onDeleteHandler());
  };

  const onDownloadClickHandler=()=>{
   onDownloadHandler(Id, fName)}

  return (
    <div
      className={`list-group-item list-group-item-action ${
        isActive && "active"
      }`}
      style={notValid ? { color: "pink" } : {}}
      onClick={onClickHandler(props.att)}
    >
      <div className="">
        {aType == "Folder" ? <Folder /> : <File />} {fName}
      </div>
      <div className="d-flex justify-content-between">
        <small>{dateCreated}</small>
        {isActive && (
          <div className="d-flex justify-content-end">
            {(aType !== "Folder")&&<button
              className="btn btn-sm  btn-primary"
              onClick={onDownloadClickHandler}
            >
              <Download />
            </button>}
            {checkWebRole(webRoles,'allowAttDel')>0&&<button
              className="btn btn-sm  btn-primary"
              onClick={onDeleteClickHandler}
            >
              <Trash />
            </button>}
          </div>
        )}
      </div>
    </div>
  );
}

export default MainListItem;
