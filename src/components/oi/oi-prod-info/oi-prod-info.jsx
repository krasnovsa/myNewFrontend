import React, { useContext, useState } from "react";
import moment from "moment";
import { CurrentAppContext } from "../../../contexts/currentApp"; // Импортируем контекст
import AttViewer from "../../attachments/att-viewer/att-viewer";
import WlList from "../../wl/wl-list"; // Импортируем компонент WlList
import Product from "../../product/product"; // Импортируем компонент Product
import SiListByOiid from "../../ship/si-list-by-oiid"; // Импортируем компонент SiListByOiid

function OiProdInfo(props) {
  const [{ curOiProd, curPj }] = useContext(CurrentAppContext); // Получаем состояние из контекста
  const oi = props.oi || curOiProd; // Используем oi из props или из контекста
  const pj = props.pj || curPj; // Используем pj из props или из контекста

  const { prodId = 0 } = oi || {}; // Добавляем проверку на наличие oi
  const { pjId = 0 } = pj || {}; // Добавляем проверку на наличие pj

  const [selectedTab, setSelectedTab] = useState("info"); // Состояние для переключения отображения

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div>
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
            selectedTab === "wlByPj" ? "active" : ""
          }`}
          onClick={() => handleTabChange("wlByPj")}
        >
          ЖР по ПЗ
        </button>
        <button
          type="button"
          className={`btn btn-primary btn-sm ${
            selectedTab === "product" ? "active" : ""
          }`}
          onClick={() => handleTabChange("product")}
        >
          Продукция
        </button>
        <button
          type="button"
          className={`btn btn-primary btn-sm ${
            selectedTab === "shipment" ? "active" : ""
          }`}
          onClick={() => handleTabChange("shipment")}
        >
          Отгрузка
        </button>
      </div>
      {selectedTab === "drawing" && (
        <AttViewer tableName="Products" keyValue={prodId} />
      )}
      {selectedTab === "wlByPj" &&
        (pjId === 0 ? (
          <div className="alert alert-info" role="alert">
            Пз не выбрано
          </div>
        ) : (
          <WlList options={{ pjId, emplId: 0 }} />
        ))}
      {selectedTab === "product" && <Product prodId={prodId} />}
      {selectedTab === "shipment" && <SiListByOiid oiId={oi.Id||0} />}
    </div>
  );
}

export default OiProdInfo;