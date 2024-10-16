import React, { useContext, useState } from "react";
import PropTypes from 'prop-types';
import { CurrentAppContext } from "../../contexts/currentApp";
import moment from "moment";

import PjInfo from './PjInfo'
import "./pjList.css";
function PjListItem(props) {
  //   "pjQttProdused": 36,
  //   "pjHrsProdused": 1.35,
  //   "pjStartDatePr": "2021-04-01T00:00:00.000Z",
  //   "pjLastDatePr": "2021-04-03T00:00:00.000Z",
  //   "pjLastBToolId": 27,
  //   "opName": "10 VC",
  //   "pjBtName": "VC85",
  //   "pjLastBtName": "VC102",
  //   "plStartDate": null,
  //   "plFinDate": null,
  //   "pjTOneSec": 250,
  const {
    pjQttProdused,
    opName,
    pjQtt,
    pjLastDatePr,
    pjId,
    pjBtName,
    pjLastBtName,
    plStartDate,
    plFinDate,
    pjTOneSec,
    isPjClosed,
   plBtName,
  } = props.pj;

  const [state, dispatch] = useContext(CurrentAppContext);
  const [showInfo, setShowInfo] = useState(false);

  const onInfoClickHandler = () => {
    setShowInfo(!showInfo);
    //history.push(`${process.env.PUBLIC_URL}/att/Продукция/${prodId}`);
  };

  const curPjId = state?.curPj?.pjId || 0;

  const onBodyClickHandler = () => {
    if (!curPjId !== pjId) {
      dispatch({ type: "SET_CURRENT_OIPROD", payload: props.oi });
      dispatch({ type: "SET_CURRENT_PJ", payload: props.pj });
      return;
    }
  };

  const finDate=plFinDate?plFinDate:pjLastDatePr

  return (
    <><li
      className={`pj-item  ${
        isPjClosed || pjQtt <= pjQttProdused
          ? "list-group-item-secondary"
          : "list-group-item-light"
      } d-flex ${curPjId === pjId ? "active" : ""}`}
      onClick={onBodyClickHandler}
    >
      <div className="col-2 p-1">
        <div>{opName}</div>
        <div>{pjId}</div>
      </div>
      <div className="col-1 p-1">
        <div>{pjTOneSec} c</div>
      </div>
      <div className="col-2 p-1">
        <div>пл:{pjQtt}</div> <div>вып: {pjQttProdused}</div>
      </div>
      <div className="col-3 p-1">
        <div> ст: {plStartDate && moment(plStartDate).format("DD.MM.YYYY")}</div>
        <div> фин: {finDate && moment(finDate).format("DD.MM.YYYY")}</div>
      </div>
      <div className="col-3 p-1">
        <div> пл: {plBtName}</div>
        <div>ф: {pjLastBtName}</div>
      </div>
      <div className="col-1 p-1">
        {curPjId === pjId && (
          <button className="btn btn-sm btn-primary m-auto" onClick={onInfoClickHandler}>
            i
          </button>
        )}
      </div>
    </li>
    {showInfo&&<PjInfo pj={props.pj}/>}
    </>
  );
}
PjListItem.propTypes = {
  pj: PropTypes.shape({
    pjQttProdused: PropTypes.number,
    opName: PropTypes.string,
    pjQtt: PropTypes.number,
    pjLastDatePr: PropTypes.string,
    pjId: PropTypes.number,
    pjBtName: PropTypes.string,
    pjLastBtName: PropTypes.string,
    plStartDate: PropTypes.string,
    plFinDate: PropTypes.string,
    pjTOneSec: PropTypes.number,
    isPjClosed: PropTypes.bool,
    plBtName: PropTypes.string,
  }).isRequired,
  oi: PropTypes.object.isRequired,
};


export default PjListItem;
