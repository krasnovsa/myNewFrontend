import React, { useEffect, useState, useContext } from "react";
import TpListFormList from "../tp-list-form-list/tp-list-form-list";
import reduceTpListData from "./reduce-tp-list-data";
import { getTechProcessList } from "../../../api/apiTp";
import { CurrentAppContext } from "../../../contexts/currentApp"; // Импортируем контекст
import "./styles.css"; // Импортируем стили

const TpListForm = ({ prodId }) => {
  const [techProcesses, setTechProcesses] = useState([]);
  const [state] = useContext(CurrentAppContext); // Используем контекст

  useEffect(() => {
    const fetchTechProcesses = async () => {
      try {
        const data = await getTechProcessList(prodId);
        const groupedTpItems = reduceTpListData(data);
        setTechProcesses(groupedTpItems);
      } catch (err) {
        console.error("Ошибка при получении техпроцессов:", err);
      }
    };

    if (prodId) {
      fetchTechProcesses();
    }
  }, [prodId, state.curProdIdTrigger]); // Добавляем зависимость от триггера

  return (
    <div className="tp-list-form">
      <div className="tp-list-form-content">
        {techProcesses.map((tp) => (
          <div key={tp.tpId} className="border-bottom">
            <TpListFormList techProcess={tp} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TpListForm;
