import React, { useContext } from "react";
import PropTypes from 'prop-types';
import { CurrentAppContext } from "../../../contexts/currentApp";
import { useNavigate } from "react-router-dom";
import './styles.css'; // Импортируем CSS файл

function OrderListItem(props) {
  const {
    ordId = 0,
    invoiceId = 0,
    dateCreated = "2021-01-01",
    isClosed = false,
    isOpen = false,
    isDirty = false,
    persShipped = 0,
    Rang = 50,
    custSName = "",
    descr = null,
    ordProdProgress = 0,
    checkMat = 1,
    plSt = -10,
    shPrice = 0,
    ordPrice = 0,
    hrsProdused = 0,
    hrsPlan = 0,
    isCO = true,
    isPO = true,
    parId = 0,
    nzp = 0,
    firmId = 16,
    invNom = "",
  } = props.ord;

  const { setFilterStr, isSub, isPar } = props;

  const [state, dispatch] = useContext(CurrentAppContext);
  const navigate = useNavigate();
  const {
    curOrder: { ordId: curOrdId },
  } = state;

  const onClickHandler = (e) => {
    if (curOrdId !== ordId) {
      dispatch({ type: "SET_CURRENT_ORDER", payload: props.ord });
      setFilterStr(custSName);
      return;
    }
    navigate(`/order/prod/${curOrdId}`);
  };

  return (
    <li
      className={`list-group-item ${curOrdId === ordId ? "active" : ""} 
      ${isOpen ? "list-group-item-light" : "list-group-item-dark"} 
      ${isClosed ? "order-closed" : "order-open"} order-list-item`}
      onClick={onClickHandler}
    >
      <div className="d-flex align-items-stretch">
        <div className="col-4">
          <div>{ordId}</div>
          <small>{dateCreated}</small>
          <div>{invNom}</div>
        </div>

        <div className="col-2">
          
        </div>
        <div className="col-5 d-flex flex-column justify-content-between">
          <div>{custSName}</div>
          <small>{descr}</small>
        </div>
      </div>
    </li>
  );
}

OrderListItem.propTypes = {
  ord: PropTypes.shape({
    ordId: PropTypes.number,
    invoiceId: PropTypes.number,
    dateCreated: PropTypes.string,
    isClosed: PropTypes.bool,
    isOpen: PropTypes.bool,
    isDirty: PropTypes.bool,
    persShipped: PropTypes.number,
    Rang: PropTypes.number,
    custSName: PropTypes.string,
    descr: PropTypes.string,
    ordProdProgress: PropTypes.number,
    checkMat: PropTypes.number,
    plSt: PropTypes.number,
    shPrice: PropTypes.number,
    ordPrice: PropTypes.number,
    hrsProdused: PropTypes.number,
    hrsPlan: PropTypes.number,
    isCO: PropTypes.bool,
    isPO: PropTypes.bool,
    parId: PropTypes.number,
    nzp: PropTypes.number,
    firmId: PropTypes.number,
    invNom: PropTypes.string,
  }).isRequired,
  setFilterStr: PropTypes.func.isRequired,
  isSub: PropTypes.bool,
  isPar: PropTypes.bool,
};

export default OrderListItem;