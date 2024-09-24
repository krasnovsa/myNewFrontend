import React, { useState, useEffect, useContext } from "react";

import RdsrItem from "./rdsr-item";
import Pagination from "../pagination";
import SearchForm from "../search-form";
import ErrorMessage from "../error-message";

import { isAuthenticated } from "../../auth/index";
import { CurrentAppContext } from "../../contexts/currentApp";

import { getList } from "../../api/apiRdsr";

const RdsrList = (props) => {
  const [{ rdsrList, currentRdsr, rdsrListChanged }, dispatch] = useContext(
    CurrentAppContext
  );
  const { pageNumber, pageSize, textFilter } = props;

  const paginUrl = `${
    process.env.PUBLIC_URL
  }/rdsr/pageNumber/*/pageSize/${pageSize}/textFilter${
    textFilter ? "/" + textFilter : ""
  }`;
  const paginUrl_1 = `${
    process.env.PUBLIC_URL
  }/rdsr/pageNumber/1/pageSize/${pageSize}/textFilter${
    textFilter ? "/" + textFilter : ""
  }`;
  const searchUrl = `${process.env.PUBLIC_URL}/rdsr/pageNumber/1/pageSize/${pageSize}/textFilter`;

  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [pageCount, setPageCount] = useState(1);

  const currentDoc = (doc, docArr) => {
    console.log("doc:", doc, "docArr", docArr);
    if (!doc) {
      return docArr[0];
    }
    return (
      docArr.find((item) => {
        if (item.rdId === doc.rdId) return true;
      }) || docArr[0]
    );
  };

  const {
    token,
    user: { _id = null },
  } = isAuthenticated();

  useEffect(() => {
    setIsLoading(true);

    getList(token, _id, pageNumber, pageSize, textFilter)
      .then((data) => {
        setIsLoading(false);
        if (data.error) {
          setError(data.error);
          dispatch({
            type: "SET_RDSR_LIST",
            payload: [],
          });
        } else {
          dispatch({
            type: "SET_RDSR_LIST",
            payload: data,
          });

          if (data.length) {
            setPageCount(Math.ceil(data[0].cr / pageSize));

            dispatch({
              type: "SET_CURRENT_RDSR",
              payload: currentDoc(currentRdsr.rdId, data),
            });
          }
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
        dispatch({
          type: "SET_RDSR_LIST",
          payload: [],
        });
      });
  }, [_id, token, pageNumber, pageSize, textFilter, rdsrListChanged]);

  const showItems = (items) => {
    return (
      items.length && (
        <div>
          <div className="alert alert-primary">
            We found {items[0] ? `${items[0].cr}` : "0"} items
          </div>
          <hr />
          <ul className="list-group">
            {items.map((rdsr, i) => {
              return <RdsrItem rdsr={rdsr} key={i} />;
            })}
          </ul>
        </div>
      )
    );
  };

  return (
    <div style={{ borderColor: "ddd" }}>
      <SearchForm
        initUrl={searchUrl}
        setError={setError}
        setIsLoading={setIsLoading}
      />

      <div style={props.style} className="mb-2">
        {rdsrList && showItems(rdsrList)}
      </div>

      {Error && <ErrorMessage message={Error} />}

      <Pagination
        pageNumber={pageNumber}
        pageCount={pageCount}
        url={paginUrl}
        url_1={paginUrl_1}
        currentPage={pageNumber}
      />
      {isLoading && "Loading..."}
    </div>
  );
};

export default RdsrList;
