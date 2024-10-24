import React, { useContext } from "react";
import PropTypes from 'prop-types';
import { CurrentAppContext } from "../../../contexts/currentApp";
import './styles.css'; // Импортируем CSS файл

const OrderListItem = ({ ord, setSearchStr }) => {
  const {
    ordId = 0,
    dateCreated = "2021-01-01",
    firmSName = "",
    invNom = "",
    custSName = "",
    descrNoHtml = "",
    hrsPlan = 0,
    hrsByTech = 0,
    hrsEcProd = 0,
    nzpHrs = 0,
    shHrs = 0,
    persShipped = 0,
    ordProdProgress = 0,
    rang = 0,
    isClosed = false,
    isOpen = false,
  } = ord;

  const [state, dispatch] = useContext(CurrentAppContext);

  const {
    curOrder: { ordId: curOrdId },
  } = state;

  const onClickHandler = (e) => {
    if (curOrdId !== ordId) {
      dispatch({ type: "SET_CURRENT_ORDER", payload: ord });
    }
    setSearchStr(custSName);
  };

  const orderClass = isClosed ? 'order-closed' : isOpen ? 'order-open' : 'order-not-open';

  // Заменяем точки с запятой на перенос строки
  const formattedDescrNoHtml = descrNoHtml.split(';').map((item, index) => (
    <React.Fragment key={index}>
      {item}
      <br />
    </React.Fragment>
  ));

  // Определяем класс для firmSName
  const firmSNameClass = `firmSName ${firmSName.toLowerCase()}`;

  return (
    <>
      {/* First Row */}
      <tr key={`${ordId}-row1`} className={`order-list-item ${curOrdId === ordId ? "active-order" : ""} ${orderClass}`} onClick={onClickHandler}>
        <td rowSpan="2" className={firmSNameClass}>{firmSName}</td><td rowSpan="2" className="ordId">{ordId}</td><td className="dateCreated">{dateCreated}</td><td rowSpan="2" className="custSName">{custSName}</td><td rowSpan="2" className="descrNoHtml">{formattedDescrNoHtml}</td><td className="hrsPlan">{hrsPlan}</td><td className= "shHrs">{shHrs}</td><td rowSpan="2" className="nzpHrs">{nzpHrs}</td><td className="persShipped">{persShipped}</td><td rowSpan="2" className="rang">{rang}</td>
      </tr>
      {/* Second Row */}
      <tr key={`${ordId}-row2`} className={`order-list-item ${curOrdId === ordId ? "active-order" : ""} ${orderClass}`} onClick={onClickHandler}>
        <td className="invNom">{invNom}</td><td className="hrsByTech">{hrsByTech}</td><td className="hrsProdused">{hrsEcProd}</td><td className="ordProdProgress">{ordProdProgress}</td>
      </tr>
    </>
  );
};

OrderListItem.propTypes = {
  ord: PropTypes.shape({
    ordId: PropTypes.number,
    dateCreated: PropTypes.string,
    firmSName: PropTypes.string,
    invNom: PropTypes.string,
    custSName: PropTypes.string,
    descrNoHtml: PropTypes.string,
    hrsPlan: PropTypes.number,
    hrsByTech: PropTypes.number,
    hrsEcProd: PropTypes.number,
    nzpHrs: PropTypes.number,
    shHrs: PropTypes.number,
    persShipped: PropTypes.number,
    ordProdProgress: PropTypes.number,
    rang: PropTypes.number,
    isClosed: PropTypes.bool,
    isOpen: PropTypes.bool,
  }).isRequired,
  setSearchStr: PropTypes.func.isRequired,
};

export default OrderListItem;