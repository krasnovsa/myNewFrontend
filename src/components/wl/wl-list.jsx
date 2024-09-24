import React, { useState, useEffect, useContext } from "react";
import { useHistory, withRouter } from "react-router-dom";
import Loader from "react-loader-spinner";

import WlItem from "./wl-item";

import Pagination from "../pagination";
import ErrorMessage from "../error-message";

import { isAuthenticated } from "../../auth/index";
import { CurrentAppContext } from "../../contexts/currentApp";

import { getWlList, getBtList } from "../../api/apiWl";

import WlListSalary from "./wl-list-salary";

const WlList = (props) => {
  const history = useHistory();

  const [wlList, setWlList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [{ currentWl }, dispatch] = useContext(CurrentAppContext);

  const {
    user: { _id = null },
  } = isAuthenticated();

  const { token } = isAuthenticated();
  const options = props.options;
  const { pageNumber, paginURL, paginURL_1, emplId } = options;
  const pageSize = options?.pageSize || 30;

  useEffect(() => {
    setIsLoading(true);

    dispatch({
      type: "SET_CURRENT_WL",
      payload: {},
    });

    

    getWlList(token, _id, {
      ...options,
      emplId: emplId >= 0 ? emplId : _id,
      pageSize,
    })
      .then((data) => {
        setIsLoading(false);
        if (data.error) {
          setError(data.error);
          setWlList([]);
        } else {
          console.log("get data", data);
          setWlList(data);
          setPageCount(Math.ceil(data[0].cr / pageSize));
          dispatch({
            type: "SET_CURRENT_WL",
            payload:
              data.find((item) => {
                if (item.wlId === currentWl.wlId) return item;
              }) || data[0],
          });
          setIsLoading(false);
          setError("");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setError("Нет данных");
        setWlList([]);
      });
  }, [_id, token, options]);

  useEffect(() => {
    getBtList(token, _id)
      .then((data) => {
        if (data.error) {
          console.log("bt list loading error " + data.error);
        } else {
          console.log("get bt list", data);
          dispatch({
            type: "SET_BT_LIST",
            payload: data,
          });
        }
      })
      .catch((err) => {
        console.log("bt list loading error " + err);
      });
  }, []);

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
          <Loader
            type="Puff"
            color="#007bff"
            height={70}
            width={70}
            timeout={3000} //3 secs
          />
        )}
      </div>
      
      {!isLoading && (
        <Pagination
          pageNumber={pageNumber}
          pageCount={pageCount}
          url={paginURL}
          url_1={paginURL_1}
          currentPage={pageNumber}
        />
      )}

      {!isLoading && (
        <div style={props.style}>
          {wlList &&
            //showItems(wlList)
            WlListSalary(wlList)}
        </div>
      )}

      {Error && <ErrorMessage message={Error} />}
    </div>
  );
};

export default withRouter(WlList);
