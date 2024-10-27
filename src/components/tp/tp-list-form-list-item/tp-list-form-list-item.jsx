import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import TPListFormListItemEdit from "../tp-list-form-list-item-edit/tp-list-form-list-item-edit";
import "./styles.css";

const TpListFormListItem = ({ tpItem, isActive, onClick }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = (e) => {
    e.stopPropagation(); // Останавливаем всплытие события, чтобы не вызывался onClick родительского элемента
    setIsEditing(true);
  };

  const handleSave = (updatedTpItem) => {
    setIsEditing(false);
    // Здесь можно добавить логику для сохранения изменений
    console.log("Сохранено:", updatedTpItem);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <TPListFormListItemEdit 
          tpItem={tpItem}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <div
          className={`list-group-item ${
            isActive ? "bg-primary text-white" : ""
          }`}
          onClick={onClick}
        >
          <div className="num">{tpItem.num}</div>
          <div className="wgName">{tpItem.wgName}</div>
          <div className="qttPlan">{tpItem.qttPlan}</div>
          <div className="qttToOne">{tpItem.qttToOne}</div>
          <div className="descr descr-text">{tpItem.descr}</div>
          <div className="edit">
            {isActive && (
              <button
                className="btn btn-light edit-btn"
                onClick={handleEditClick}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TpListFormListItem;
