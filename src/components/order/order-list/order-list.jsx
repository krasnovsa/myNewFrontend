import React, { useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';
import { ThreeDots } from "react-loader-spinner";
import { CurrentAppContext } from "../../../contexts/currentApp";
import OrderListItem from "../order-list-item/order-list-item";
import { getOrderList } from "../../../api/apiOrder";
import { isAuthenticated } from "../../../auth";
import { reduceOrdArr } from "../helpers/reduceOrdArr";
import './styles.css';

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
    <div className="order-list-container">
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
      <div className="order-list-content">
        {isLoading ? (
         <div className="loader-container">
          <ThreeDots color="#0d6efd" height={80} width={80} />
        </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <table className="table table-bordered table-custom">
            <thead>
              <tr>
                <th className="firmSName" rowSpan="2">Орг.</th>
                <th className="ordId" rowSpan="2">ID заказа</th>
                <th className="dateCreated">Дата создания</th>
                <th className="custSName" rowSpan="2">Заказчик</th>
                <th className="descrNoHtml" rowSpan="2">Примечания</th>
                <th className="hrsPlan">План,ч</th>
                <th className="shHrs">Отгр,ч</th>
                <th className="nzpHrs" rowSpan="2">НЗП,ч</th>
                <th className="persShipped">Отгр,%</th>
                <th className="rang" rowSpan="2">Ранг</th>
              </tr>
              <tr>
                <th className="invNom">Счет</th>
                <th className="hrsByTech">Техн,ч</th>
                <th className="hrsProdused">Пр,ч.</th>
                <th className="ordProdProgress">Пр,%</th>
              </tr>
            </thead>
            <tbody>
              {ordList.map((order, index) => (
                <OrderListItem key={order._id || order.id || index} ord={order} setFilterStr={setFilterStr} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

OrderList.propTypes = {
  filterStr: PropTypes.string,
  loadMode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default OrderList;