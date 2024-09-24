import React from 'react';
import UploadFile from "./UploadFile";
import './uploader.css'

const UploadList = ({uploadList}) => {
    

    
return ( uploadList?.length!==0 &&
        <ul className="list-group mt-2 ">
            
            {uploadList.map(file =>
                <UploadFile key={file.id} file={file} />
            )}

        </ul>
    );
};

export default UploadList;
