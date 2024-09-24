import React, { useState } from "react";
import { Table } from "react-bootstrap-icons";




import MainList from "./MainList";

import ShowImage from "./ShowImage";
import ShowText from "./ShowText";
import ShowPdf from "./ShowPdf";
import {fileType} from './fileType'

function Viewer(props) {
  const { table, keyValue } = props;
  const [file, setFile] = useState({});

  const changeItem = (att) => {
    setFile(att);
  };


  return (
    <div>
      <div>
        <MainList
          table={table}
          keyValue={keyValue}
          parId={0}
          Id={0}
          changeItem={changeItem}
        />
      </div>
      {file.notValid && (
        <div className="alert alert-danger" role="alert">
          Этот файл отменен
        </div>
      )}
      <div className="d-flex flex-column d-flex align-items-center">
        {fileType(file) === 'image' && (
          <div className='card m-2'>
            <ShowImage fileURL={file.fileURL} />
          </div>
        )}
        {fileType(file) === 'txt' && (
          <div className='card m-2'>
            <ShowText fileURL={file.fileURL} />
          </div>
        )}
        <div className='m-2'>
          {fileType(file) ==='pdf'&& (
            <ShowPdf fileURL={file.fileURL}/>
          )}
        </div>
      </div>
    </div>
  );
}

export default Viewer;
