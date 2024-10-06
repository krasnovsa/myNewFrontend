import React, { useContext, useState, useEffect } from "react";
import { CurrentAppContext } from "../../contexts/currentApp";
import { useNavigate } from "react-router-dom";

import { Highlighter } from '../common/Highlighter/Highlighter';
import PjList from "../pj/PjList";
import OiProdInfo from "./oi-prod-info";
import replaceSubstrings from "../../helpers/repalaceSubstrings";

function OiProdListItem(props) {
  const {
    prodName,
    oiQtt,
    color,
    matMapNoHTML,
    matSpec,
    oiQttShipped,
    oiHrsProdused,
    oiHrsSum,
    oiId,
    prodId,
    oiPercHrs,
    oiSName,
    shipCalendar
  } = props.oi.info;

  const { pjArr } = props.oi;

  // const style = {
  //   backgroundColor: `#${color.toString(16)}`,
  //   borderRadius: "5px",
  //   fontSize: "10px" // Уменьшение размера шрифта
  // };


  const [isExtended, setIsExtended] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const [state, dispatch] = useContext(CurrentAppContext);

  const curOiProd = state?.curOiProd?.oiId || 0;
  const { ordFilterStr = '' } = state;
  const extAllPj = state?.extAllPj || false;

  useEffect(() => {
    setIsExtended(extAllPj);
  }, [extAllPj]);

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
    setShowInfo(!showInfo);
    // navigate(`${process.env.PUBLIC_URL}/att/Продукция/${prodId}`);
  };

  return (
    <>
      <div
        className={`oi-item list-group-item p-0 ${
          curOiProd === oiId ? "active" : ""
        } `}
        style={{ display: "grid", gridTemplateColumns: "5px 1fr 30px", gap: "10px", alignItems: "center", fontSize: "10px" }}
      >
        <div
          style={{
            backgroundColor: `#${color.toString(16)}`,
            width: "5px",
            height: "100%",
          }}
        ></div>
        <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: "10px", alignItems: "center", fontSize: "10px" }}>
          <div
            className="p-1"
            onClick={onBodyClickHandler}
            style={{ display: "grid", gridTemplateColumns: "1fr 50px 50px 70px 70px", alignItems: "center", fontSize: "10px" }}
          >
            <div className="m-auto">
              <span className="p-1 mr-1">
                {oiSName}
              </span>
            </div>
            <div className="m-auto">
              зак:{oiQtt}
            </div>
            <div className="m-auto">
              отгр:{oiQttShipped}
            </div>
            <div className="m-auto">
              вып ч:{oiHrsProdused}
            </div>
            <div className="m-auto">
              вып %:{oiPercHrs}%
            </div>
          </div>
          <div
            className="p-1"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", alignItems: "center", fontSize: "10px" }}
          >
            <div className="m-auto">
              {shipCalendar}
            </div>
            <div className="m-auto">
              {matSpec}
            </div>
            <div className="m-auto">
              {matMapNoHTML}
            </div>
          </div>
        </div>
        <div className="m-auto p-1">
          {curOiProd === oiId && (
            <button
              className="btn btn-sm btn-primary m-auto d-flex align-items-center"
              onClick={onInfoClickHandler}
              style={{ fontSize: "10px" }}
            >
              i
            </button>
          )}
        </div>
      </div>

      {showInfo && <OiProdInfo oi={props.oi.info} />}

      {isExtended === true && (
        <div>
          <PjList pjList={pjArr} />
        </div>
      )}
    </>
  );
}

export default OiProdListItem;