import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { getServer } from "../../api/getServer";

const {SERVER} = getServer()

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function ShowPdf(props) {
  const { fileURL } = props;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  console.log(`${SERVER}${fileURL}`);
  return (
    <div className="card-img-top">
      <div className='d-flex justify-content-center'>
        <button
          className={` btn btn-primary ${pageNumber === 1 && "disabled"}`}
          onClick={() => {console.log(pageNumber)
            if (pageNumber > 1) {
              
              setPageNumber(pageNumber - 1);
            }
          }}
        >
          Пред
        </button>
        <button
          className={`ml-2 btn btn-primary ${
            pageNumber === numPages && "disabled"
          }`}
          onClick={() => {
            if (pageNumber < numPages) {
              setPageNumber(pageNumber + 1);
            }
          }}
        >
          Сдед
        </button>
      </div>
      <Document
        file={`${SERVER}${fileURL}`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page width={400} pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}

export default ShowPdf;
