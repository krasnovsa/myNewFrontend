import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { CurrentAppContext } from "../../../contexts/currentApp";
import { updateTpItem } from "../../../api/apiTp"; // Import the updateTpItem function

const TPListFormListItemEdit = ({ tpItem, onSave, onCancel }) => {
  const [editedTpItem, setEditedTpItem] = useState(tpItem);
  const [state] = useContext(CurrentAppContext);
  const [wgData, setWgData] = useState([]);

  useEffect(() => {
    // Функция для загрузки данных, связанных с wgId
    const loadWgData = async () => {
      // здесь можно подгружать данные с сервера
      // например, запрос к API для получения wgName и wgUnName по wgId
      const fetchedData = state.workGroups;

      setWgData(fetchedData);
    };

    loadWgData();
  }, [tpItem.Id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTpItem({ ...editedTpItem, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      const token = state.auth.token; // Предполагается, что токен хранится в состоянии приложения
      const userId = state.auth.user.id; // Предполагается, что идентификатор пользователя хранится в состоянии приложения
      await updateTpItem(token, userId, editedTpItem); // Вызываем метод updateTpItem из apiTp
      onSave(editedTpItem); // Вызываем onSave для обновления состояния родительского компонента
    } catch (err) {
      console.error("Ошибка при обновлении tpItem:", err);
    }
  };

  return (
    <>
      <div className="form-group num">
        <input
          type="number"
          name="num"
          className="form-control"
          value={editedTpItem.num}
          onChange={handleInputChange}
          placeholder="Номер операции"
        />
      </div>
      <div className="form-group wgId">
        <select
          name="wgId"
          className="form-control"
          value={editedTpItem.wgId}
          onChange={handleInputChange}
        >
          <option value="" disabled>
            Тип операции
          </option>
          {wgData.map((item) => (
            <option key={item.Id} value={item.Id}>
              {item.name} ({item.wgUnName})
            </option>
          ))}
        </select>
      </div>
      <div className="form-group qttPlan">
        <input
          type="number"
          name="qttPlan"
          className="form-control"
          value={editedTpItem.qttPlan}
          onChange={handleInputChange}
          placeholder="Плановое количество"
        />
      </div>
      <div className="form-group descr">
        <input
          type="text"
          name="descr"
          className="form-control"
          value={editedTpItem.descr}
          onChange={handleInputChange}
          placeholder="Описание"
        />
      </div>
      <div className="form-group qttToOne">
        <input
          type="number"
          name="qttToOne"
          className="form-control"
          value={editedTpItem.qttToOne}
          onChange={handleInputChange}
          placeholder="Количество на единицу"
        />
      </div>
      <div className="form-buttons">
        <button className="btn btn-success" onClick={handleSaveClick}>
          <FontAwesomeIcon icon={faSave} />
        </button>
        <button className="btn btn-secondary" onClick={onCancel}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </>
  );
};

export default TPListFormListItemEdit;
