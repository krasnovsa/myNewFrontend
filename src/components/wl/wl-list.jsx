import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { ThreeDots } from "react-loader-spinner";

import WlItem from "./wl-item";
import WlItemLight from "./wl-items-light/wl-item-light";
import ErrorMessage from "../error-message";

import { isAuthenticated } from "../../auth/index";
import { CurrentAppContext } from "../../contexts/currentApp";

import { getWlList, getBtList } from "../../api/apiWl";


const WlList = (props) => {
  const [wlList, setWlList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [{ currentWl }, dispatch] = useContext(CurrentAppContext);

  const {
    user: { _id = null },
  } = isAuthenticated();

  const { token } = isAuthenticated();
  const {
    emplId = 0,
    pageNumber = 1,
    pageSize = 30,
    dStart = "2021-01-01",
    dFin = "2031-01-01",
    direction = 0,
    oiId = 0,
    pjId = 0,
    opId = 0,
    prodId = 0,
  } = props.options;

  useEffect(() => {
    const fetchWlList = async () => {
      setIsLoading(true);

      try {
        const data = await getWlList(token, _id, {
          oiId,
          prodId,
          emplId: emplId >= 0 ? emplId : _id,
          pageNumber,
          pageSize,
          dStart,
          dFin,
          direction,
          pjId,
          opId,
        });

        setIsLoading(false);
        if (data.error) {
          setError(data.error);
          setWlList([]);
        } else {
          console.log("get data", data);
          setWlList(data);

          setError("");
        }
      } catch (err) {
        setIsLoading(false);
        setError("Нет данных");
        setWlList([]);
      }
    };

    fetchWlList();
  }, [
    token,
    _id,
    dispatch,
    oiId,
    prodId,
    emplId,
    pageNumber,
    pageSize,
    dStart,
    dFin,
    direction,
    pjId,
    opId,
  ]);

  useEffect(() => {
    const fetchBtList = async () => {
      try {
        const data = await getBtList(token, _id);
        if (data.error) {
          console.log("bt list loading error " + data.error);
        } else {
          console.log("get bt list", data);
          dispatch({
            type: "SET_BT_LIST",
            payload: data,
          });
        }
      } catch (err) {
        console.log("bt list loading error " + err);
      }
    };

    fetchBtList();
  }, [token, _id, ]);

  const showItems = (items) => {
    return (
      <ul className="list-group">
        {items.map((wlItem) => {
          return <WlItemLight wl={wlItem} key={wlItem.wlId} />;
        })}
      </ul>
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        {isLoading && (
          <ThreeDots
            color="#007bff"
            height={70}
            width={70}
            visible={isLoading}
          />
        )}
      </div>

      {!isLoading && (
        <div style={props.style}>{wlList && showItems(wlList)}</div>
      )}

      {error && <ErrorMessage message={error} />}
    </div>
  );
};

WlList.propTypes = {
  options: PropTypes.shape({
    emplId: PropTypes.number,
    pageNumber: PropTypes.number,
    pageSize: PropTypes.number,
    dStart: PropTypes.string,
    dFin: PropTypes.string,
    direction: PropTypes.number,
    oiId: PropTypes.number,
    pjId: PropTypes.number,
    opId: PropTypes.number,
    prodId: PropTypes.number,
  }).isRequired,
  style: PropTypes.object,
};

export default WlList;
