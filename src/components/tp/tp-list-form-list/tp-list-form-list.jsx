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
  const { curTpItem } = state;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleItemClick = (item) => {
    setActiveItemId(item.Id);
    dispatch({ type: "SET_CUR_TP_ITEM", payload: item });
  };

  const isCurrentTp = curTpItem && curTpItem.tpId === techProcess.tpId;

  return (
    <div>
      <div
        className={`row align-items-center 
          ${curTpItem && curTpItem.tpId === techProcess.tpId && " bg-light"}
          ${techProcess.tpIsDefault && " font-color-blue"}
          `}
      >
        <div
          className={`col form-group mb-0`}
        >
          <p
            onClick={toggleCollapse}
            style={{ cursor: "pointer" }}
            className="form-control-plaintext"
          >
            <FontAwesomeIcon
              icon={isCollapsed ? faPlus : faMinus}
              className="mr-2"
            />
           
            {techProcess.tpId}
            {curTpItem && curTpItem.tpId === techProcess.tpId && "*"}
          </p>
        </div>
        <div className="col form-group mb-0">{techProcess.tpAuthorId}</div>
        <div className="col form-group mb-0">{techProcess.tpCrDate}</div>
        <div className="col form-group mb-0">
          {techProcess.tpIsDefault ? "Да" : "Нет"}
        </div>
      </div>

      {!isCollapsed && (
        <div>
          <div className="list-group-item-header">
            <div className="header num">Номер</div>
            <div className="header wgName">Группа работ</div>
            <div className="header qttPlan">Ед на оп</div>
            <div className="header qttToOne">Оп на деталь</div>
            <div className="header descr">Описание</div>
            <div className="header edit"></div>
          </div>
          <div className="list-group ">
            {techProcess.tpItems.map((item) => (
              <TpListFormListItem
                tpItem={item}
                key={item.Id}
                isActive={item.Id === activeItemId && curTpItem && curTpItem.tpId === techProcess.tpId }
                onClick={() => handleItemClick(item)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TpListFormList;
