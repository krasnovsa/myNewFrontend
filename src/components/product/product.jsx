import React, { useState } from "react";
import AttViewer from "../attachments/att-viewer/att-viewer"; // Импортируем компонент AttViewer
import TpListForm from "../tp/tp-list-form/tp-list-form"; // Импортируем компонент TpListForm
import MaterialForm from "../material/material-to-product";
import ProductHeader from "./product-header";
import ProdCalcPrice from "./product-calc-price"; // Импортируем компонент ProdCalcPrice

const Product = ({ prodId }) => {
  const [selectedTab, setSelectedTab] = useState("drawing");
  const [quantity, setQuantity] = useState(1000); // Добавляем состояние для количества

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  console.log("loading prodId", prodId);

  return (
    <div>
      <ProductHeader prodId={prodId} />
      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          className={`btn btn-primary ${
            selectedTab === "drawing" ? "active" : ""
          }`}
          onClick={() => handleTabChange("drawing")}
        >
          Чертеж
        </button>
        <button
          type="button"
          className={`btn btn-primary ${
            selectedTab === "technology" ? "active" : ""
          }`}
          onClick={() => handleTabChange("technology")}
        >
          Технология
        </button>
        <button
          type="button"
          className={`btn btn-primary ${
            selectedTab === "material" ? "active" : ""
          }`}
          onClick={() => handleTabChange("material")}
        >
          Материал
        </button>
        <button
          type="button"
          className={`btn btn-primary ${
            selectedTab === "calculation" ? "active" : ""
          }`}
          onClick={() => handleTabChange("calculation")}
        >
          Рассчет
        </button>
      </div>
      {selectedTab === "drawing" && (
        <AttViewer tableName="Products" keyValue={prodId} />
      )}
      {selectedTab === "technology" && <TpListForm prodId={prodId} />}
      {selectedTab === "material" && (
        <div>
          <MaterialForm prodId={prodId} />
        </div>
      )}
      {selectedTab === "calculation" && (
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
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
          <ProdCalcPrice prodId={prodId} initialQtt={quantity} />
        </div>
      )}
    </div>
  );
};

export default Product;
