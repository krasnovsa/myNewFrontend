import React, { useState, useEffect, useContext, useMemo } from "react";
import { ThreeDots } from "react-loader-spinner";

import WlItem from "./wl-item";
import ErrorMessage from "../error-message";

import { isAuthenticated } from "../../auth/index";
import { CurrentAppContext } from "../../contexts/currentApp";

import { getWlList, getBtList } from "../../api/apiWl";

const WlList = (props) => {
  const [wlList, setWlList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [{ currentWl }, dispatch] = useContext(CurrentAppContext);

  const {
    user: { _id = null },
  } = isAuthenticated();

  const { token } = isAuthenticated();
  const options = useMemo(() => props.options, [props.options]);
  //const { emplId, oiId, prodId } = options;
  const pageSize = options?.pageSize || 30;

  useEffect(() => {
    const fetchWlList = async () => {
      setIsLoading(true);

      dispatch({
        type: "SET_CURRENT_WL",
        payload: {},
      });

      try {
        const data = await getWlList(token, _id, {
          oiId,
          prodId,
          emplId: emplId >= 0 ? emplId : _id,
          pageSize,
        });

        setIsLoading(false);
        if (data.error) {
          setError(data.error);
          setWlList([]);
        } else {
          console.log("get data", data);
          setWlList(data);
          
          dispatch({
            type: "SET_CURRENT_WL",
            payload:
              data.find((item) => item.wlId === currentWl.wlId) || data[0],
          });
          setError("");
        }
      } catch (err) {
        setIsLoading(false);
        setError("Нет данных");
        setWlList([]);
      }
    };

    fetchWlList();
  }, [token, _id,  dispatch]);

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
  }, [token, _id, dispatch]);

  const showItems = (items) => {
    return (
      <ul className="list-group">
        {items.map((wlItem) => {
          return <WlItem wl={wlItem} key={wlItem.wlId} />;
        })}
      </ul>
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        {isLoading && (
          <ThreeDots
            type="Puff"
            color="#007bff"
            height={70}
            width={70}
            timeout={3000} //3 secs
          />
        )}
      </div>
      
      {!isLoading && (
        <div style={props.style}>
          {wlList && showItems(wlList)}
        </div>
      )}

      {Error && <ErrorMessage message={Error} />}
    </div>
  );
};

export default WlList;