import React, { useContext } from "react";
import { CurrentAppContext } from "../../../contexts/currentApp";
import PropTypes from "prop-types";
import "./styles.css"; // Import CSS for styling

const WlItemLight = ({ wl }) => {
  const [state, dispatch] = useContext(CurrentAppContext);

  const handleOnClick = () => {
    dispatch({ type: "SET_CURRENT_WL", payload: wl });
  };

  const {
    currentWl: { wlId: curWlId },
  } = state;

  return (
    <li
      className={`list-group-item wl-item-light-grid ${
        wl.wlId === curWlId ? "active" : ""
      }`}
      onClick={handleOnClick}
    >
      
        {/* First row */}
        <div className="date">{new Date(wl.wDate).toLocaleDateString()}</div>
        <div className="shift">{wl.wShift}</div>
        <div className="tone">{wl.tOne}</div>
        <div className="unname">{wl.unName}</div>
        <div className="qtt">{wl.qtt} шт</div>
        <div className="wtime">{wl.wTimeHrs} ч</div>

        {/* Corresponding second row fields under the same columns */}
        <div className="eFio">{wl.eFio}</div>
     
    </li>
  );
};

WlItemLight.propTypes = {
  wl: PropTypes.object.isRequired,
};

export default WlItemLight;
