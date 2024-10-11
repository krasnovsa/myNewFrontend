import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import TPListFormListItemEdit from "../tp-list-form-list-item-edit/tp-list-form-list-item-edit";

const TpListFormListItem = ({ tpItem, isActive, onClick }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
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
    <div
      className={`list-group-item ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {isEditing ? (
        <TPListFormListItemEdit
          tpItem={tpItem}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <div className="num">{tpItem.num}</div>
          <div className="wgName">{tpItem.wgName}</div>
          <div className="qttPlan">{tpItem.qttPlan}</div>
          <div className="descr descr-text">{tpItem.descr}</div>
          <div className="qttToOne">{tpItem.qttToOne}</div>
          {isActive && (
            <button
              className="btn btn-primary edit-btn"
              onClick={handleEditClick}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default TpListFormListItem;
