import React, {useState} from "react";
import { Folder } from "react-bootstrap-icons";
import { isAuthenticated } from "../../../auth";
import { addFolder, uploadFile } from "../../../api/apiAtt";
import UploadList from './UploadList'

function UploadForm(props) {
  const { table, keyValue, changeTrigger, fullRelPath='\\', withUploadList=true , withAddFolder=true} = props;

  const [uploadList, setUploadList] = useState([]);
  const {
    user: { _id = null },
  } = isAuthenticated();
  const { token } = isAuthenticated();

 const  inputChangeHandler = (e)=>{
  console.log(e)
    let files =  [...e.target.files];
    if(files?.length!==0){
    fileUploadHandler(files)};
  }

  function dropHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    let files = [...event.dataTransfer.files];
    if(files?.length!==0){
      fileUploadHandler(files)};
  }

  const [dragEnter, setDragEnter] = useState(false);
  function dragEnterHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(true);
  }

  function dragLeaveHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(false);
  }

  function fileUploadHandler(files) {
    files.forEach((file) => {
      const uploadId = Date.now();
      const uplFile = { name: file.name, progress: 0, id: uploadId };
      setUploadList([...uploadList, uplFile]);
      console.log("prepare transfer", file);
      uploadFile(
        token,
        _id,
        file,
        table,
        keyValue,
        "file",
        fullRelPath || "/",
        changeProgress,
        uploadId
      )().then(() => {
        changeTrigger();
      });
    });
  }

  function addFolderHandler(event) {
    let fName = prompt("Название папки", "Новая папка");
    if (fName) {
      addFolder(token, _id, fName, table, keyValue, fullRelPath || "/").then(
        (res) => {
          console.log(res);
          changeTrigger();
          //.catch((err)=>{console.log(err)})
        }
      );
    }
  }

  const changeProgress = (progress, uploadId) => {
    if (progress < 100) {
      setUploadList([
        ...uploadList,
        [
          ...uploadList.map((file) =>
            file.id == uploadId ? { ...file, progress: progress } : { ...file }
          ),
        ],
      ]);
    } else {
      setUploadList(
        uploadList.filter((file) => {
          return file.id !== uploadId;
        })
      );
    }
  };

  return (
    <div>
      {!dragEnter ? (
        <div className="disk__upload m-1  ">
          <label
            htmlFor="disk__upload-input"
            className="disk__upload-label"
            onDragEnter={dragEnterHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragEnterHandler}
          >
            Загрузить файл
          </label>
          <input
            multiple={true}
            onChange={inputChangeHandler}
            type="file"
            id="disk__upload-input"
            className="disk__upload-input"
          />
        </div>
      ) : (
        <div
          className="drop-area"
          onDrop={(e) => dropHandler(e)}
          onDragEnter={dragEnterHandler}
          onDragLeave={dragLeaveHandler}
          onDragOver={dragEnterHandler}
        >
          Перетащите файлы сюда
        </div>
      )}
      {withAddFolder&&<button
        className="btn btn-outline-secondary m-1"
        onClick={addFolderHandler}
      >
        +<Folder />
      </button>}
      {withUploadList&&<UploadList uploadList={uploadList} />}
    </div>
  );
}

export default UploadForm;
