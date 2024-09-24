import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";

import GtItem from "./gt-item";
import Pagination from "../pagination";
import SearchForm from "../search-form";
import ErrorMessage from "../error-message";

import { isAuthenticated } from "../../auth/index";
import { CurrentAppContext } from "../../contexts/currentApp";

import { getGtList, AccList } from "../../api/apiGetTools";

const GtList = (props) => {
  const history = useHistory();
  const { pageNumber, pageSize, textFilter, parAccId } = props;
  const paginUrl = `${process.env.PUBLIC_URL}/gt/pageNumber/*/pageSize/${pageSize}/parAccId/${parAccId}/textFilter/${textFilter}`;
  const paginUrl_1 = `${process.env.PUBLIC_URL}/gt/pageNumber/1/pageSize/${pageSize}/parAccId/${parAccId}/textFilter/${textFilter}`;
  const searchUrl = `${process.env.PUBLIC_URL}/gt/pageNumber/1/pageSize/${pageSize}/parAccId/${parAccId}/textFilter`;

  const [gtList, setGtList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  // const [parAccId, setParAccIdl] = useState(0);

  const [{ currentGt }, dispatch] = useContext(CurrentAppContext);

  const {
    user: { _id = null },
  } = isAuthenticated();

  const { token } = isAuthenticated();

  const handleAccOnChange = (e) => {
    history.push(
      `${process.env.PUBLIC_URL}/gt/pageNumber/1/pageSize/${pageSize}/parAccId/${e.target.value}/textFilter/${textFilter}`
    );
  };

  useEffect(() => {
    setIsLoading(true);
    // console.log('start fetching')
    // console.log('props in BoxList', props)
    dispatch({
      type: "SET_CURRENT_GT",
      payload: {},
    });
    getGtList(token, _id, parAccId, textFilter, pageNumber, pageSize)
      .then((data) => {
        setIsLoading(false);
        if (data.error) {
          setError(data.error);
          setGtList([]);
          return;
        }

        console.log("get data", data);
        setGtList(data);
        setPageCount(Math.ceil(data[0].cr / pageSize));
        dispatch({
          type: "SET_CURRENT_GT",
          payload:
            data.find((item) => {
              if (
                item.accId == currentGt.accId &&
                item.resId == currentGt.resId &&
                item.resTable == currentGt.resTable &&
                item.reservId == currentGt.reservId
              )
                return item;
            }) || data[0],
        });
        setIsLoading(false);
        setError("");
      })
      .catch((err) => {
        setIsLoading(false);
        setError("Нет данных");
        setGtList([]);
      });
  }, [_id, token, pageNumber, pageSize, textFilter, parAccId]);

  const showItems = (items) => {
    return (
      <div>
        <div className="alert alert-primary">
          Найдено {items[0] ? `${items[0].cr}` : "0"} позиций
        </div>
        <hr />
        <ul className="list-group">
          {items.map((gtItem, i) => {
            return <GtItem gt={gtItem} key={i} />;
          })}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <form>
        <select
          value={parAccId}
          className="form-control mb-2"
          onChange={handleAccOnChange}
        >
          <option key={0} value={0}>
            склад не выбран
          </option>
          {AccList.map((item) => {
            return (
              <option key={item.accId} value={item.accId}>
                {item.accName}
              </option>
            );
          })}
        </select>
      </form>

      <SearchForm
        initUrl={searchUrl}
        setError={setError}
        setIsLoading={setIsLoading}
      />
      {!isLoading &&<Pagination
        pageNumber={pageNumber}
        pageCount={pageCount}
        url={paginUrl}
        url_1={paginUrl_1}
        currentPage={pageNumber}
      />}
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

      <div style={props.style}>{gtList && showItems(gtList)}</div>

      {Error && <ErrorMessage message={Error} />}
    </div>
  );
};

export default GtList;
