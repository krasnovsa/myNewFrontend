import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AttViewer from "../attachments/att-viewer/att-viewer";
import TpListForm from "../tp/tp-list-form/tp-list-form";
import MaterialForm from "../material/material-to-product";
import ProductHeader from "./product-header";
import ProdCalcPrice from "./product-calc-price";

const Product = ({ prodId, qtt }) => {
  const [selectedTab, setSelectedTab] = useState("drawing");
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleTpPage = () => {
    navigate(`/tp-page/${prodId}`);
  };

  if (prodId <= 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex flex-column">
      <ProductHeader prodId={prodId} />
      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          className={`btn btn-primary btn-sm ${
            selectedTab === "drawing" ? "active" : ""
          }`}
          onClick={() => handleTabChange("drawing")}
        >
          Чертеж
        </button>
        <button
          type="button"
          className={`btn btn-primary btn-sm ${
            selectedTab === "technology" ? "active" : ""
          }`}
          onClick={() => handleTabChange("technology")}
        >
          Технология
        </button>
        <button
          type="button"
          className={`btn btn-primary btn-sm ${
            selectedTab === "material" ? "active" : ""
          }`}
          onClick={() => handleTabChange("material")}
        >
          Материал
        </button>
        <button
          type="button"
          className={`btn btn-primary btn-sm ${
            selectedTab === "calculation" ? "active" : ""
          }`}
          onClick={() => handleTabChange("calculation")}
        >
          Рассчет
        </button>
      </div>
      <div className="flex-grow-1 overflow-auto">
        {selectedTab === "drawing" && (
          <AttViewer tableName="Products" keyValue={prodId} />
        )}
        {selectedTab === "technology" && (
          <div>
            <button className="btn btn-primary btn-sm mt-1" onClick={handleTpPage}>
              Создать/Редактировать техпроцесс
            </button>
            <TpListForm prodId={prodId} />
          </div>
        )}
        {selectedTab === "material" && (
          <div>
            <MaterialForm prodId={prodId} initialQtt={qtt || 1000} />
          </div>
        )}
        {selectedTab === "calculation" && (
          <div>
            <ProdCalcPrice prodId={prodId} initialQtt={qtt || 1000} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
