import React, { useState, useEffect, useContext } from "react";
import Loader from "react-loader-spinner";

import { CurrentAppContext } from "../../contexts/currentApp";

import SearchForm from "../search-form";
import OrderDropDown from "./OrderDropDown";
import OrderListItem from "./OrderListItem";
import { getOrderList } from "../../api/apiOrder";
import { isAuthenticated } from "../../auth";
import { reduceOrdArr } from "./helpers/reduceOrdArr";
import './order.css'

function OrderList(props) {
  const {
    user: { _id = null },
  } = isAuthenticated();
  const { token } = isAuthenticated();

  const { filterStr = "", loadMode = 0 } = props;

  const [ordList, setOrdList] = useState([]);
  const [requeryTrigger, setRequeryTrigger] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [custSName, setCustSName] = useState("");
  const [{ ordFilterStr }, dispatch] = useContext(CurrentAppContext);

  const style = {
    height: "80vh",
    overflow: "auto",
  };

  useEffect(() => {
    setIsLoading(true);

    getOrderList(token, _id, filterStr, loadMode)
      .then((list) => {
        if (list?.length !== 0 && !list.error) {
          console.log("list is", reduceOrdArr(list));
          setOrdList(reduceOrdArr(list));
          setError(false);
          dispatch({ type: "SET_ORD_FILTER_STR", payload: filterStr });
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  }, [, filterStr, loadMode, requeryTrigger]);

  return (
    <div className="">
      <div className="m-auto">
        <SearchForm
          initUrl={`${process.env.PUBLIC_URL}/orders/0`}
          setIsLoading={setIsLoading}
          setError={setError}
          extFilterStr={custSName}
        />
      </div>
      <div className="d-flex justify-content-start">
        <OrderDropDown />
        <small className="cur-filter ml-3 align-self-start">{ordFilterStr}</small>
      </div>
      {error && <div className="alert alert-danger">.{error}</div>}
      {isLoading && (
        <div className="d-flex justify-content-center">
          <div>
            <Loader
              type="Puff"
              color="#007bff"
              height={70}
              width={70}
              timeout={5000} //3 secs
            />
          </div>
        </div>
      )}
      <div style={style}>
        <ul className="list-group mt-2 ">
          {ordList?.length !== 0 &&
            ordList.map((item) => {
              return (
                <div key={item.ordId}>
                  <OrderListItem
                    key={item.ordId}
                    ord={item}
                    isSub={false}
                    isPar={item?.subOrds?.length !== 0}
                    setFilterStr={setCustSName}
                  />
                  {item?.subOrds?.length !== 0 &&
                    item.subOrds.map((subItem) => {
                      return (
                        <OrderListItem
                          key={subItem.ordId}
                          ord={subItem}
                          isSub={true}
                          isPar={false}
                          setFilterStr={setCustSName}
                        />
                      );
                    })}
                </div>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default OrderList;
