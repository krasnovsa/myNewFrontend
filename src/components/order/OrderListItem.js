import React, { useContext } from "react";
import { CurrentAppContext } from "../../contexts/currentApp";
import { useHistory } from "react-router-dom";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./order.css";

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
  const history = useHistory();
  const {
    curOrder: { ordId: curOrdId },
  } = state;

  const onClickHandler = (e) => {
    if (curOrdId !== ordId) {
      dispatch({ type: "SET_CURRENT_ORDER", payload: props.ord });
      setFilterStr(custSName);
      return;
    }
    history.push(`${process.env.PUBLIC_URL}/order/prod/${curOrdId}`);
  };

  const getProdStatusVariant = (ps) => {
    if (ps <= -35) {
      return "danger";
    }
    if (ps > -35 && ps <= -15) {
      return "warning";
    }
    if (ps > -15 && ps <= -5) {
      return "primary";
    }
    if (ps > -5) {
      return "success";
    }
  };

  const getCheckMatVariant = (chm) => {
    return chm === 0 ? "warning" : "success";
  };

  return (
    <li
      className={`list-group-item  ${curOrdId === ordId ? "active" : ""} ${
        isClosed && isPar ? " list-group-item-secondary" : ""
      }${isClosed  ? " list-group-item-dark" : ""}${
    
        !isClosed && isPar ? " list-group-item-primary" : ""
      }${!isClosed && isSub ? " list-group-item-info" : ""}${
        !isOpen ? " not-open" : ""
      }
      `}
      onClick={onClickHandler}
    >
      <div className="d-flex align-items-stretch">
        <div className="col-4">
          <div>{ordId}</div>
          <small>{dateCreated}</small>
          <div>{invNom}</div>
        </div>

        <div className="col-3">
          <CircularProgressbarWithChildren
            value={persShipped}
            strokeWidth={8}
            styles={buildStyles({
              pathColor: "#205068",
              trailColor: "transparent",
            })}
          >
            <div style={{ width: "84%" }}>
              <CircularProgressbarWithChildren
                value={ordProdProgress}
                styles={buildStyles({
                  trailColor: "transparent",
                })}
              >
                <div
                  style={{ color: "#205068", fontSize: "small" }}
                >{`${Math.ceil(persShipped)}%`}</div>
                <small
                  style={{ color: "3e98c7", fontSize: "x-small" }}
                >{`${Math.ceil(ordProdProgress)}%`}</small>
              </CircularProgressbarWithChildren>
            </div>
          </CircularProgressbarWithChildren>
        </div>
        <div className="col-5 d-flex flex-column justify-content-between">
          <div>{custSName}</div>
          <small>{descr}</small>
          {!isPar&&<div className="d-flex justify-content-end">
            <div
              className={`badge badge-pill badge-${getProdStatusVariant(plSt)}`}
            >
              П
            </div>
            <div
              className={`ml-1 badge badge-pill badge-${getCheckMatVariant(
                checkMat
              )}`}
            >
              М
            </div>
          </div>}
        </div>
      </div>
    </li>
  );
}

export default OrderListItem;
