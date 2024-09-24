import React, { useState, useEffect } from "react";
import { getServer } from "../../api/getServer";

const {SERVER} = getServer()

function ShowText(props) {
  const [fileText, setFileText] = useState("");
  const { fileURL } = props;
  const divStyle = {
    // display:'block',
    height: "80vh",
    width: "100%",
    backgroundColor:"#FFF"
  };

  useEffect(() => {
    try {
      //console.log(`${SERVER}${fileURL}`)
      fetch(`${SERVER}${fileURL}`)
        .then((response) => {
          return response.text();
        })
        .then((text) => {
          setFileText(text);
        })
        .catch((err) => {
          setFileText("error");
        });
    } catch {
      setFileText("load error");
    }
  }, [, fileURL]);
  return (
    <div style={divStyle}>
      <pre className="card-text h-100 col-12">
        {fileText}
      </pre>
    </div>
  );
}

export default ShowText;
