import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getProdCalcPriceList } from "../../api/apiProduct";

const ProdCalcPrice = ({ prodId, initialQtt }) => {
  const [priceDataTable, setPriceDataTable] = useState([]);
  const [priceFull, setPriceFull] = useState(null); // Состояние для нетабличных данных
  const [priceMat, setPriceMat] = useState(null); // Состояние для нетабличных данных
  const [priceWork, setPriceWork] = useState(null); // Состояние для нетабличных данных
  const [pricePurchase, setPricePurchase] = useState(null); // Состояние для нетабличных данных
  const [error, setError] = useState(null);
  const [qtt, setQtt] = useState(initialQtt);


  const [purchasePrice, setPurchasePrice] = useState(10);

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

        // Запрос данных цены детали в нетабличном виде 
        const dataPriceFull = await getProdCalcPriceList(prodId, {
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
        if (dataPriceFull.length === 0) {
          setError("No price data found");
          return;
        } else {
          setPriceFull(dataPriceFull[0]);
        }

    // Запрос данных цены материала в нетабличном виде 
    const dataPriceMat = await getProdCalcPriceList(prodId, {
      prodQtt: qtt,
      tpId: -1,
      withCNC: 0,
      withAdj: 0,
      withBought: 0,
      withMaterials: 1,
      asTable: 0, // Нетабличный вид
      custCNCprice: 0,
      withNoCNC: 0,
    });
    if (dataPriceMat.length === 0) {
      setError("No price data found");
      return;
    } else {
      setPriceMat(dataPriceMat[0]);
    };

// Запрос данных цены работы
const dataWorkPrice = await getProdCalcPriceList(prodId, {
  prodQtt: qtt,
  tpId: -1,
  withCNC: 1,
  withAdj: 1,
  withBought: 0,
  withMaterials: 0,
  asTable: 0, // Нетабличный вид
  custCNCprice: 0,
  withNoCNC: 0,
});
if (dataWorkPrice.length === 0) {
  setError("No price data found");
  return;
} else {
setPriceWork(dataWorkPrice[0]);
}; 

// Запрос данных цены покупных операций
const dataPurchasePrice = await getProdCalcPriceList(prodId, {
  prodQtt: qtt,
  tpId: -1,
  withCNC: 0,
  withAdj: 0,
  withBought: 1,
  withMaterials: 0,
  asTable: 0, // Нетабличный вид
  custCNCprice: 0,
  withNoCNC: 0,
});
if (dataPurchasePrice.length === 0) {
  setError("No price data found");
  return;
} else {
setPricePurchase(dataPurchasePrice[0])
};



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

  if (priceDataTable.length === 0 || !priceFull || !priceMat || !priceWork || !pricePurchase) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Количество</th>
              <th>Цена детали</th>
              <th>Цена работы</th>
              <th>Цена материала</th>
              <th>Цена покупных операций</th>
              <th>Часов на заказ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  className="form-control"
                  value={qtt}
                  onChange={handleQttChange}
                />
              </td>
              <td>
                <ul className="list-unstyled">
                  <li className="badge bg-primary">на шт: {priceFull.prOne || 0}</li>
                  <li className="badge bg-success">на заказ: {priceFull.prOrd || 0}</li>
                </ul>
              </td>
              <td>
                <ul className="list-unstyled">
                  <li className="badge bg-primary">на шт: {priceWork.prOne || 0}</li>
                  <li className="badge bg-success">на заказ: {priceWork.prOrd || 0}</li>
                </ul>
              </td>
              <td>
                <ul className="list-unstyled">
                  <li className="badge bg-primary">на шт: {priceMat.prOne || 0}</li>
                  <li className="badge bg-primary">на заказ: {priceMat.prOrd || 0}</li>
                </ul>
              </td>
              <td>
                <ul className="list-unstyled">
                  <li className="badge bg-primary">на шт: {pricePurchase.prOne || 0}</li>
                  <li className="badge bg-primary">на заказ: {pricePurchase.prOrd || 0}</li>
                </ul>
              </td>
              <td>
                <ul className="list-unstyled">
                  <li className="badge bg-primary">{priceFull.tHrsOrd || 0}</li>
                  <li className="badge bg-info">tm: {priceFull.tm || 0}</li>
                  <li className="badge bg-warning">pr: {priceFull.pr || 0}</li>
                  <li className="badge bg-danger">adm: {priceFull.adm || 0}</li>
                </ul>
              </td>            
              </tr>
          </tbody>
        </table>
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
    </div>
  );
};

ProdCalcPrice.propTypes = {
  prodId: PropTypes.number.isRequired,
  initialQtt: PropTypes.number.isRequired,
};

export default ProdCalcPrice;