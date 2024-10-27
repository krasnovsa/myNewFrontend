import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getPriceHistory } from "../../api/apiProduct";

const ProductPriceHistory = ({ prodId }) => {
  const [priceHistory, setPriceHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPriceHistory = async () => {
      try {
        const data = await getPriceHistory(prodId);
        if (Array.isArray(data)) {
          setPriceHistory(data);
        } else {
          setError("Unexpected data format");
        }
      } catch (err) {
        console.error("Error fetching price history:", err);
        setError("Error fetching price history");
      }
    };

    fetchPriceHistory();
  }, [prodId]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (priceHistory.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Дата</th>
            <th>Заказ/заявка</th>
            <th>Количество</th>
            <th>Цена</th>
            <th>Сумма</th>
          </tr>
        </thead>
        <tbody>
          {priceHistory.map((item, index) => (
            <tr
              key={index}
              style={{
                backgroundColor:
                  item.ordType === "заказ" ? "#cff7d6" : "#ffffff",
              }}
            >
              <td>{new Date(item.dateCreated).toLocaleDateString()}</td>
              <td>{item.ordType}</td>
              <td>{item.qtt}</td>
              <td>{item.price}</td>
              <td>{(item.qtt * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ProductPriceHistory.propTypes = {
  prodId: PropTypes.number.isRequired,
};

export default ProductPriceHistory;
