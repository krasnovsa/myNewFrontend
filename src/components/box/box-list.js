import React, { useState, useEffect, useContext } from "react";

import BoxItem from "./box-item";
import Pagination from "../pagination";
import SearchForm from "../search-form";
import ErrorMessage from "../error-message";

import { isAuthenticated } from "../../auth/index";
import { CurrentAppContext } from "../../contexts/currentApp";

import { getBoxList } from "../../api/apiBox";

const BoxList = (props) => {
  const { pageNumber, pageSize, textFilter } = props;
  const paginUrl = `${process.env.PUBLIC_URL}/boxes/pageNumber/*/pageSize/${pageSize}/textFilter/${textFilter}`;
  const paginUrl_1 = `${process.env.PUBLIC_URL}/boxes/pageNumber/1/pageSize/${pageSize}/textFilter/${textFilter}`;
  const searchUrl = `${process.env.PUBLIC_URL}/boxes/pageNumber/1/pageSize/${pageSize}/textFilter`;

  const [boxList, setBoxList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [pageCount, setPageCount] = useState(1);

  const [{ currentBox }, dispatch] = useContext(CurrentAppContext);

  const {
    user: { _id = null },
  } = isAuthenticated();

  const { token } = isAuthenticated();

  useEffect(() => {
    setIsLoading(true);
    // console.log('start fetching')
    // console.log('props in BoxList', props)

    getBoxList(token, _id, pageNumber, pageSize, textFilter)
      .then((data) => {
        setIsLoading(false);
        if (data.error) {
          setError(data.error);
          setBoxList([]);
        } else {
          //console.log('get data', data)
          setBoxList(data);
          setPageCount(Math.ceil(data[0].cr / pageSize));
          dispatch({
            type: "SET_CURRENT_BOX",
            payload:
              data.find((item) => {
                if (item.Id == currentBox.Id) return item;
              }) || data[0],
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
        setBoxList([]);
      });
  }, [_id, token, pageNumber, pageSize, textFilter]);

  const showItems = (items) => {
    return (
      <div>
        <div className="alert alert-primary">
          Найдено {items[0] ? `${items[0].cr}` : "0"} позиций
        </div>
        <hr />
        <ul className="list-group">
          {items.map((box, i) => {
            return <BoxItem box={box} key={i} />;
          })}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <SearchForm initUrl={searchUrl}
      setError={setError}
      setIsLoading={setIsLoading} />
      <Pagination
        pageNumber={pageNumber}
        pageCount={pageCount}
        url={paginUrl}
        url_1={paginUrl_1}
        currentPage={pageNumber}
      />
      <div style={props.style}>{boxList && showItems(boxList)}</div>

      {isLoading && "Loading..."}
      {Error && <ErrorMessage message={Error} />}
    </div>
  );
};

export default BoxList;
