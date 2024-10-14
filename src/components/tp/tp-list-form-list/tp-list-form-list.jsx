import React, { useState, useContext } from "react";
import TpListFormListItem from "../tp-list-form-list-item/tp-list-form-list-item";
import { CurrentAppContext } from "../../../contexts/currentApp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "./styles.css"; // Импортируем CSS-файл

const TpListFormList = ({ techProcess }) => {
  const [isCollapsed, setIsCollapsed] = useState(!techProcess.tpIsDefault);
  const [activeItemId, setActiveItemId] = useState(null);
  const [state, dispatch] = useContext(CurrentAppContext);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleItemClick = (item) => {
    setActiveItemId(item.Id);
    dispatch({ type: "SET_CUR_TP_ITEM", payload: item });
  };

  return (
    <div className="form-group ">
      <div className="row align-items-center bg-light">
        <div className="col form-group mb-0">
          <p onClick={toggleCollapse} style={{ cursor: "pointer" }} className="form-control-plaintext">
            <FontAwesomeIcon icon={isCollapsed ? faPlus : faMinus} className="mr-2" />
            {techProcess.tpId}
          </p>
        </div>
        <div className="col form-group mb-0">
          <p className="form-control-plaintext">{techProcess.tpAuthorId}</p>
        </div>
        <div className="col form-group mb-0">
          <p className="form-control-plaintext">{techProcess.tpCrDate}</p>
        </div>
        <div className="col form-group mb-0">
          <p className="form-control-plaintext">{techProcess.tpIsDefault ? "Да" : "Нет"}</p>
        </div>
      </div>

      {!isCollapsed && (
        <div>
          <div className="list-group-item">
            <div className="header num">Номер</div>
            <div className="header wgId">Группа работ</div>
            <div className="header qttPlan">Плановое количество</div>
            <div className="header descr">Описание</div>
            <div className="header qttToOne">Количество на единицу</div>
          </div>

          {techProcess.tpItems.map((item) => (
            <TpListFormListItem
              tpItem={item}
              key={item.Id}
              isActive={item.Id === activeItemId}
              onClick={() => handleItemClick(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TpListFormList;