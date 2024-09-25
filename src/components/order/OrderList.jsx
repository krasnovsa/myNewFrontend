import React, { useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';
import { ThreeDots } from "react-loader-spinner";
import { CurrentAppContext } from "../../contexts/currentApp";
import OrderListItem from "./OrderListItem";
import { getOrderList } from "../../api/apiOrder";
import { isAuthenticated } from "../../auth";
import { reduceOrdArr } from "./helpers/reduceOrdArr";
import './order.css';

function OrderList(props) {
  const {
    user: { _id = null },
  } = isAuthenticated();
  const { token } = isAuthenticated();

  const { loadMode = 0 } = props;

  const [searchStr, setSearchStr] = useState("");
  const [filterStr, setFilterStr] = useState(props.filterStr || "");
  const [ordList, setOrdList] = useState([]);
  const [requeryTrigger, setRequeryTrigger] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [{ ordFilterStr }, dispatch] = useContext(CurrentAppContext);

  const style = {
    height: "80vh",
    overflow: "auto",
  };

  useEffect(() => {
    const fetchOrderList = async () => {
      setIsLoading(true);
      try {
        const list = await getOrderList(token, _id, filterStr, Number(loadMode));
        if (list && list.length !== 0 && !list.error) {
          console.log("list is", reduceOrdArr(list));
          setOrdList(reduceOrdArr(list));
          setError(false);
          dispatch({ type: "SET_ORD_FILTER_STR", payload: filterStr });
        } else {
          setError("No orders found or an error occurred.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderList();
  }, [filterStr, loadMode, requeryTrigger, token, _id, dispatch]);

  const handleSearchChange = (e) => {
    setSearchStr(e.target.value);
  };

  const handleSearchClick = () => {
    setFilterStr(searchStr);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setFilterStr(searchStr);
    }
  };

  return (
    <div className="" style={style}>
      <div className="input-group mb-3">
        <input
          type="text"
          value={searchStr}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          placeholder="Search orders..."
          className="form-control"
        />
        <button
          className="btn btn-primary"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>
      {isLoading ? (
        <ThreeDots color="#00BFFF" height={80} width={80} />
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        ordList.map((order) => (
          <OrderListItem key={order._id || order.id} ord={order} />
        ))
      )}
    </div>
  );
}

OrderList.propTypes = {
  filterStr: PropTypes.string,
  loadMode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default OrderList;