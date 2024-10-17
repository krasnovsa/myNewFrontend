import React, { useState } from "react";
import AttViewer from "../attachments/att-viewer/att-viewer"; // Импортируем компонент AttViewer
import TpListForm from "../tp/tp-list-form/tp-list-form"; // Импортируем компонент TpListForm
import MaterialForm from "../material/material-to-product";

const Product = ({ prodId }) => {
  const [selectedTab, setSelectedTab] = useState("drawing");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div>
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
      </div>
      {selectedTab === "drawing" && <AttViewer tableName="Products" keyValue={prodId} />}
      {selectedTab === "technology" && <TpListForm prodId={prodId} />}
      {selectedTab === "material" && <div><MaterialForm prodId={prodId}/></div>}
    </div>
  );
};

export default Product;