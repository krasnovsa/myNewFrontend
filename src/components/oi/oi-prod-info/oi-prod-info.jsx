import React, { useContext, useState } from "react";
import moment from "moment";
import { CurrentAppContext } from "../../../contexts/currentApp"; // Импортируем контекст
import AttViewer from "../../attachments/att-viewer/att-viewer";
import WlList from "../../wl/wl-list"; // Импортируем компонент WlList
import Product from "../../product/product"; // Импортируем компонент Product

function OiProdInfo(props) {
  
   const [{curOiProd,curPj}] = useContext(CurrentAppContext); // Получаем состояние из контекста
  const oi = props.oi || curOiProd; // Используем oi из props или из контекста
  const pj = props.pj || curPj; // Используем pj из props или из контекста
// console.log('last oi prod info oi', oi, 'pj', pj)
  const {
    prodId = 0,
  } = oi || {}; // Добавляем проверку на наличие oi

  const { pjId = 0 } = pj || {}; // Добавляем проверку на наличие pj

  const [selectedTab, setSelectedTab] = useState("info"); // Состояние для переключения отображения


  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div
      className="card p-2"
      style={{ width: "100%", height: "100%", overflowY: "auto" }}
    >
      <div className="card-body p-1">
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
              selectedTab === "wlByPj" ? "active" : ""
            }`}
            onClick={() => handleTabChange("wlByPj")}
          >
            ЖР по ПЗ
          </button>
          <button
            type="button"
            className={`btn btn-primary ${
              selectedTab === "product" ? "active" : ""
            }`}
            onClick={() => handleTabChange("product")}
          >
            Продукция
          </button>
        </div>
        {selectedTab === "drawing" && <AttViewer tableName='Products' keyValue={prodId} />}
        {selectedTab === "wlByPj" &&
          (pjId === 0 ? (
            <div className="alert alert-info" role="alert">
              Пз не выбрано
            </div>
          ) : (
            <WlList options={{ pjId, emplId: 0 }} />
          ))}
        {selectedTab === "product" && 
        <Product prodId={prodId} 
        />}
      </div>
      <div className="card-img-bottom">
        {/* {prodId&&<SliderAtt table='Продукция' keyValue={prodId}/>} */}
      </div>
    </div>
  );
}

export default OiProdInfo;