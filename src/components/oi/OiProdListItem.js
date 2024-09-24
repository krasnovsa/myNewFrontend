import React, { useContext, useState, useEffect } from "react";
import { CurrentAppContext } from "../../contexts/currentApp";
import { useHistory } from "react-router-dom";

import {Highlighter} from '../common/Highlighter/Highlighter'
import PjList from "../pj/PjList";
import OiProdInfo from "./OiProdInfo";
import './oiList.css'
// prodName: it.prodName,
// oiQtt: it.oiQtt,
// color:it.color,
// matMap:it.matMap,
// matSpec:it.matSpec,
// oiQttShipped:it.oiQttShipped,
// oiHrsProdused:it.oiHrsProdused,
// oiHrsSum:it.oiHrsSum

function OiProdListItem(props) {
  const {
    prodName,
    oiQtt,
    color,
    matMap,
    matSpec,
    oiQttShipped,
    oiHrsProdused,
    oiHrsSum,
    oiId,
    prodId,
    oiPercHrs,
  } = props.oi.info;

  const { pjArr } = props.oi;

  const history = useHistory();

  const style = {
    backgroundColor: `#${color.toString(16)}`,
    borderRadius: "5px",
  };

  const [isExtended, setIsExtended] = useState(false);

  const [showInfo, setShowInfo] = useState(false);

  const [state, dispatch] = useContext(CurrentAppContext);

  const curOiProd = state?.curOiProd?.oiId || 0;

  const {ordFilterStr=''} = state;

  const extAllPj = state?.extAllPj || false;

  useEffect(() => {
    setIsExtended(extAllPj);
  }, [, extAllPj]);

  const onBodyClickHandler = (e) => {
    e.stopPropagation();
    setIsExtended(!isExtended);
    if (curOiProd !== oiId) {
      dispatch({ type: "SET_CURRENT_OIPROD", payload: props.oi.info });
      dispatch({ type: "SET_CURRENT_PJ", payload: {} });

      return;
    }
  };

  const onInfoClickHandler = () => {
    setShowInfo(!showInfo)
    //history.push(`${process.env.PUBLIC_URL}/att/Продукция/${prodId}`);
  };

  return (
    <>
      <div
        className={`d-flex oi-item list-group-item p-0 ${
          curOiProd === oiId ? "active" : ""
        }`}
      >
        <div className="d-flex col-11 p-1" onClick={onBodyClickHandler}>
          <div className="col-2 m-auto">
            <span style={style} className="p-1 mr-1">
              {oiId}
            </span>
          </div>
          <div  className=" col-7 m-auto"> 
            <Highlighter highlight={ordFilterStr}>{prodName}</Highlighter>
          </div>
          <div className=" col-3 m-auto">
            <div>зак {oiQtt}</div>
            <div>
              отг{' '}
              <span
                className={`badge badge-pill badge-${
                  oiQttShipped < oiQtt ? "danger" : ""
                }${oiQttShipped === oiQtt ? "primary" : ""}${
                  oiQttShipped > oiQtt ? "success" : ""
                }`}
              >
                {oiQttShipped}
              </span>
            </div>
            <div>{`вып: ${oiPercHrs}%`}</div>
          </div>
        </div>
        <div className=" col-1 m-auto p-1">
          {curOiProd === oiId && (
            <button
              className=" btn btn btn-sm btn-primary m-auto d-flex align-items-center"
              onClick={onInfoClickHandler}
            >
              i
            </button>
          )}
        </div>
      </div>

      {showInfo&&<OiProdInfo oi={props.oi.info}/>}

      {isExtended === true && (
        <div>
          <PjList pjList={pjArr} />
        </div>
      )}
    </>
  );
}

export default OiProdListItem;
