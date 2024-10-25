import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getProdCalcPriceList } from "../../api/apiProduct";

const ProdCalcPrice = ({ prodId, initialQtt }) => {
  const [priceDataTable, setPriceDataTable] = useState([]);
  const [priceDataNonTable, setPriceDataNonTable] = useState(null); // Состояние для нетабличных данных
  const [error, setError] = useState(null);
  const [qtt, setQtt] = useState(initialQtt);

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        // Запрос данных в табличном виде
        const dataTable = await getProdCalcPriceList(prodId, {
          prodQtt: qtt,
          tpId: -1,
          withCNC: 1,
          withAdj: 1,
          withBought: 1,
          withMaterials: 1,
          asTable: 1,
          custCNCprice: 0,
          withNoCNC: 1,
        });
        setPriceDataTable(dataTable);

        // Запрос данных в нетабличном виде
        const dataNonTable = await getProdCalcPriceList(prodId, {
          prodQtt: qtt,
          tpId: -1,
          withCNC: 1,
          withAdj: 1,
          withBought: 1,
          withMaterials: 1,
          asTable: 0, // Нетабличный вид
          custCNCprice: 0,
          withNoCNC: 0,
        });
        setPriceDataNonTable(dataNonTable);
      } catch (err) {
        console.error("Error fetching price data:", err);
        setError("Error fetching price data");
      }
    };

    fetchPriceData();
  }, [prodId, qtt]);

  const handleQttChange = (e) => {
    setQtt(e.target.value);
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (priceDataTable.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-3">
        <label htmlFor="quantity" className="form-label">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          className="form-control"
          value={qtt}
          onChange={handleQttChange}
        />
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Num</th>
              <th>WgName</th>
              <th>QttToOne</th>
              <th>QttUnInTO</th>
              <th>UnName</th>
              <th>QttUnOrder</th>
              <th>PrUn</th>
              <th>PrOne</th>
              <th>PrOrd</th>
              <th>WgCEc</th>
              <th>OpCEc</th>
              <th>PriceEc</th>
            </tr>
          </thead>
          <tbody>
            {priceDataTable.map((item, index) => (
              <tr key={index}>
                <td>{item.num}</td>
                <td>{item.wgName}</td>
                <td>{item.qttToOne}</td>
                <td>{item.qttUnInTO}</td>
                <td>{item.unName}</td>
                <td>{item.qttUnOrder}</td>
                <td>{item.prUn}</td>
                <td>{item.prOne}</td>
                <td>{item.prOrd}</td>
                <td>{item.wgCEc}</td>
                <td>{item.opCEc}</td>
                <td>{item.priceEc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {priceDataNonTable && (
        <div className="mt-4">
          <h5>Нетабличные данные:</h5>
          <pre>{JSON.stringify(priceDataNonTable, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

ProdCalcPrice.propTypes = {
  prodId: PropTypes.number.isRequired,
  initialQtt: PropTypes.number.isRequired,
};

export default ProdCalcPrice;
