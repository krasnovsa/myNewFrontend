import React, { useContext } from "react";
import { CurrentAppContext } from "../../contexts/currentApp";

const GtItem = ({ gt }) => {
  const {
    accId,
      accName,
     resId,
     resTable,
     resName,
     reservId,
     reservDef,
      resQtt,
      // un1Name
  } = gt;

const [state, dispatch] = useContext(CurrentAppContext);
  
const {
    currentGt: { 
    accId:curAccId,
     resId:curResId,
     resTable:curResTable,
     reservId:curReservId
     },
  } = state;



  
  const handleOnClick = () => {
    dispatch({ type: "SET_CURRENT_GT", payload: gt });
  };

  return (
    <li
      className= {`list-group-item flex-column align-items-start ${(accId==curAccId&&resId==curResId&&resTable==curResTable&&reservId==curReservId)?"active":""}`}
      onClick={handleOnClick}
    >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">
          {resName} 
          <span className="badge badge-pill badge-primary">{resQtt}</span>
        </h5>
      </div>
      <p className="mb-1">{accName}</p>
      <div className="d-flex w-100 justify-content-between">
        <small className="mr-2">{reservDef}</small>
      </div>
    </li>
  );
};

export default GtItem;
