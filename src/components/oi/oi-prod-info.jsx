import React, { useContext, useState } from "react";
import moment from "moment";
import { CurrentAppContext } from "../../contexts/currentApp"; // Импортируем контекст
import AttViewer from "../attachments/att-viewer/att-viewer";
import WlList from "../wl/wl-list"; // Импортируем компонент WlList
import Product from "../product/product"; // Импортируем компонент Product

function OiProdInfo(props) {
  
   const [{curOiProd,curPj}] = useContext(CurrentAppContext); // Получаем состояние из контекста
  const oi = props.oi || curOiProd; // Используем oi из props или из контекста
  const pj = props.pj || curPj; // Используем pj из props или из контекста
console.log('last oi prod info oi', oi, 'pj', pj)
  const {
    prodName = "",
    oiQtt = 0,
    color = "ffffff",
    matMap = "не заказано",
    matSpec = "",
    oiQttShipped = 0,
    oiHrsProdused = 0,
    oiHrsSum = 0,
    oiId = 0,
    prodId = 0,
    pjLastDatePr = null,
    oiSName = "",
  } = oi || {}; // Добавляем проверку на наличие oi

  const { pjId = 0 } = pj || {}; // Добавляем проверку на наличие pj

  const [selectedTab, setSelectedTab] = useState("info"); // Состояние для переключения отображения

  const style = {
    backgroundColor: color ? `#${color.toString(16)}` : "#ffffff", // Проверяем наличие color
    borderRadius: "5px",
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div
      className="card p-2"
      style={{ width: "100%", height: "100%", overflowY: "auto" }}
    >
      <h3 className="card-title">{oiSName}</h3>
      <div className="card-body p-1">
        <div className="btn-group" role="group" aria-label="Basic example">
          <button
            type="button"
            className={`btn btn-primary ${
              selectedTab === "info" ? "active" : ""
            }`}
            onClick={() => handleTabChange("info")}
          >
            Инфо
          </button>
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
        {selectedTab === "info" && (
          <>
            <div></div>
            <small>материал</small>
            <div>{matSpec}</div>
            <small>снабжение</small>
            <div>{matMap || "не заказано"}</div>
            <small>количество</small>
            <div>{oiQtt}</div>
            <small>отгружено</small>
            <div>{oiQttShipped}</div>
            <small>часов фактически</small>
            <div>{oiHrsProdused}</div>
            <small>часов план</small>
            <div>{oiHrsSum}</div>
            <small>дата завершения произвоства</small>
            <div>
              {pjLastDatePr
                ? moment(pjLastDatePr).format("DD.MM.YYYY")
                : "нет данных"}
            </div>
          </>
        )}
        {selectedTab === "drawing" && <AttViewer tableName='Products' keyValue={prodId} />}
        {selectedTab === "wlByPj" &&
          (pjId === 0 ? (
            <div className="alert alert-info" role="alert">
              Пз не выбрано
            </div>
          ) : (
            <WlList options={{ pjId, emplId: 0 }} />
          ))}
        {selectedTab === "product" && <Product prodId={prodId} />}
      </div>
      <div className="card-img-bottom">
        {/* {prodId&&<SliderAtt table='Продукция' keyValue={prodId}/>} */}
      </div>
    </div>
  );
}

export default OiProdInfo;