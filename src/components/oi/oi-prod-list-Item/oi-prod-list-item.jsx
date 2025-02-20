import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { CurrentAppContext } from "../../../contexts/currentApp";
import { Highlighter } from "../../common/Highlighter/Highlighter";
import PjList from "../../pj/PjList";
import "./styles.css"; // Импортируем стили
import { formatTextWithColor } from "../../../utils/textFormatter";

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
    oiSName,
    shipCalendar,
  } = props.oi.info;

  

  const { pjArr } = props.oi;

  const [isExtended, setIsExtended] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const [state, dispatch] = useContext(CurrentAppContext);

  const curOiProd = state?.curOiProd?.oiId || 0;
  const { ordFilterStr = "" } = state;
  const extAllPj = state?.extAllPj || false;

  useEffect(() => {
    setIsExtended(extAllPj);
  }, [extAllPj]);

  const onBodyClickHandler = (e) => {
    e.stopPropagation();
    
    if (curOiProd !== oiId) {
      dispatch({ type: "SET_CURRENT_OIPROD", payload: props.oi.info });
      dispatch({ type: "SET_CURRENT_PJ", payload: {} });
      return;
    } else {
      setIsExtended(!isExtended);
     }
  };

  const onInfoClickHandler = () => {
    setShowInfo(!showInfo);
  };

  // Определение класса для oiQttShipped
  const getOiQttShippedClass = () => {
    if (curOiProd === oiId) {
      return ""; // Не применять условное форматирование для активного элемента
    }
    if (oiQttShipped < oiQtt) {
      return "text-danger"; // Красный цвет
    } else if (oiQttShipped === oiQtt) {
      return "text-success"; // Зеленый цвет
    } else {
      return "text-primary"; // Синий цвет
    }
  };

  return (
    <>
      <div className={`oi-item p-0 ${curOiProd === oiId ? "active" : ""}`}>
        <div
          className="color-bar"
          style={{ backgroundColor: `#${color.toString(16)}` }}
        ></div>
        <div className="oi-item-content" onClick={onBodyClickHandler}>
          <div className="oi-item-header p-1">
            <div className="m-auto">{oiSName}</div>
            <div className="m-auto">зак:{oiQtt}</div>
            <div className={`m-auto ${getOiQttShippedClass()}`}>
              отгр:{oiQttShipped}
            </div>
            <div className="m-auto">вып ч:{oiHrsProdused}</div>
            <div className="m-auto">вып %:{oiPercHrs}%</div>
          </div>
          <div className="oi-item-details p-1">
            <div className="m-auto">{shipCalendar}</div>
            <div className="m-auto">{matSpec}</div>
            <div className="m-auto">{formatTextWithColor(matMap)}</div>
          </div>
        </div>
        <div className="m-auto p-1">
          {curOiProd === oiId && (
            <button
              className="btn btn-sm btn-primary m-auto d-flex align-items-center"
              onClick={onInfoClickHandler}
            >
              i
            </button>
          )}
        </div>
      </div>

      {isExtended === true && (
        <div>
          <PjList pjList={pjArr} oi={props.oi.info} />
        </div>
      )}
    </>
  );
}

OiProdListItem.propTypes = {
  oi: PropTypes.shape({
    info: PropTypes.shape({
      prodName: PropTypes.string,
      oiQtt: PropTypes.number,
      color: PropTypes.string,
      matMapNoHTML: PropTypes.string,
      matSpec: PropTypes.string,
      oiQttShipped: PropTypes.number,
      oiHrsProdused: PropTypes.number,
      oiHrsSum: PropTypes.number,
      oiId: PropTypes.number,
      prodId: PropTypes.number,
      oiPercHrs: PropTypes.number,
      oiSName: PropTypes.string,
      shipCalendar: PropTypes.string,
    }).isRequired,
    pjArr: PropTypes.array.isRequired,
  }).isRequired,
};

export default OiProdListItem;