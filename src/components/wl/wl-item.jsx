import React, { useContext } from "react";
import { CurrentAppContext } from "../../contexts/currentApp";
import moment from 'moment'

const WlItem = ({ wl }) => {
  const {
    wlId,
    wDate,
    wShift,
    btId,
    qtt,
    tOne,
    wName,
    btName,
    note,
    wTypeId,
    pjId,
    wSalary,
    c550m,
    cMat,
    unName
  } = wl;

  const [state, dispatch] = useContext(CurrentAppContext);

  const {
    currentWl: { wlId: curWlId },
  } = state;

  const isCnc = (wt) => {
    return wt === 1 || wt === 9 || wt === 55 ? true : false;
  };

  const handleOnClick = () => {
    dispatch({ type: "SET_CURRENT_WL", payload: wl });
  };

  return (
    <li
      className={`list-group-item flex-column align-items-start ${
        wlId == curWlId ? "active" : ""
      }`}
      onClick={handleOnClick}
    >
      <div className="d-flex w-100 justify-content-center">
        <h5 className="mb-1">
          {wName}
        </h5>
      </div>
      <div className="d-flex w-100 justify-content-between">


        <small className="m-1 mr-5">{ `ПЗ: ${pjId}`}</small>
        <small className="m-1">{ `Id: ${wlId}`}</small>
        <small className="m-1">{btName}</small>
        <small className="m-1">{`${qtt} опер. по ${tOne} ${unName}`}</small>

      </div>
      <div className="d-flex w-100 justify-content-start">

        <small className="m-1">{wSalary?wSalary.toFixed(2):""} руб </small>
        <small className="m-1">к550={c550m}</small>
        <small className="m-1">кМат={cMat}</small>
        <small className="m-1"><b>Итого: {((wSalary?wSalary:0)*c550m*cMat).toFixed(2)} руб </b></small>
        
      </div>
    </li>
  );
};

export default WlItem;
