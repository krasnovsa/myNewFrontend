import React, { useEffect, useState } from "react";
import { getMaterialPriceHistory } from "../../api/apiMaterial";

const PriceHistory = ( {matId, mass} ) => {
  // console.log("PriceHistory", matId, mass);
  const [priceData, setPriceData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPriceHistory = async () => {
      if (!matId || isNaN(mass)) {
        console.error("Invalid input data");
        setError("Invalid input data");
        return;

      }
      setError(null);
      try {
        const data = await getMaterialPriceHistory(matId);
        if (!Array.isArray(data)) {
          setError("Invalid data received from API");
          return;
        }
        setPriceData(data);
      } catch (err) {
        console.error("Error fetching price history:", err);
        setError("Error fetching price history");
      }
    };

    fetchPriceHistory();
  }, [matId, mass]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card" style={{ height: "300px", overflowY: "auto" }}>
      <div className="card-body">
        <h5 className="card-title">История цен</h5>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th style={{ width: "100px" }}>Дата</th>
                <th style={{ width: "100px" }}>Цена Мат</th>
                <th>Стоимость</th>
              </tr>
            </thead>
            <tbody>
              {priceData.map((item, index) => (
                <tr key={index}>
                  <td>
                    {new Date(item.DateOfChange).toLocaleDateString("ru-RU")}
                  </td>
                  <td>{item.PriceOfRes}</td>
                  <td>{(item.PriceOfRes * (mass || 1)).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PriceHistory;
