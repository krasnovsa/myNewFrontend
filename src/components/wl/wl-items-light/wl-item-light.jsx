import React, { useContext } from "react";
import { CurrentAppContext } from "../../../contexts/currentApp";
import PropTypes from "prop-types";
import "./styles.css"; // Import CSS for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const WlItemLight = ({ wl }) => {
  const [state, dispatch] = useContext(CurrentAppContext);

  const handleOnClick = () => {
    dispatch({ type: "SET_CURRENT_WL", payload: wl });
  };

  const {
    currentWl: { wlId: curWlId },
  } = state;

  const renderShiftIcon = (shift) => {
    if (shift === 1) {
      return <FontAwesomeIcon icon={faSun} />;
    } else if (shift === 2) {
      return <FontAwesomeIcon icon={faMoon} />;
    } else {
      return shift;
    }
  };

  return (
    <li
      className={`wl-item-light-grid ${wl.wlId === curWlId ? "active" : ""}`}
      onClick={handleOnClick}
    >
      {/* First row */}
      <div className="date">{new Date(wl.wDate).toLocaleDateString()}</div>
      <div className="shift">{renderShiftIcon(wl.wShift)}</div>
      <div className="btname">{wl.btName}</div>
      <div className="tone">{wl.tOne}</div>
      <div className="unname">{wl.unName}</div>
      <div className="qtt">{wl.qtt} шт</div>
      <div className="wtime">{wl.wTimeHrs} ч</div>
      <div className="descr">{wl.descr}</div>

      {/* Corresponding second row fields under the same columns */}
      <div className="eFio">{wl.eFio}</div>
    </li>
  );
};

WlItemLight.propTypes = {
  wl: PropTypes.object.isRequired,
};

export default WlItemLight;
