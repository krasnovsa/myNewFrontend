import React from "react";
import { getServer } from "../../api/getServer";
const {SERVER} = getServer()
const divStyle = {
  display: "block",
  heigth: "200px",
};

function ShowImage(props) {
  const { fileURL } = props

  return (
    <>
      
      <img src={`${SERVER}${fileURL}`} className="card-img-top"></img>
    </>
  );
}

export default ShowImage;
