import React, { useContext, useState, useEffect } from "react";
import { CurrentAppContext } from "../../../contexts/currentApp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { addOperationToTechProcess } from "../../../api/apiTp"; // Импортируем метод
import "./styles.css"; // Импортируем CSS-файл
import { isAuthenticated } from "../../../auth/index";

const TpAddFormListItem = ({ index, onDelete }) => {
  const [state, dispatch] = useContext(CurrentAppContext);
  const [operation, setOperation] = useState(
    state.tpAddOpsTemplate.operations[index]
  );
  const [wgData, setWgData] = useState([]); // данные связанные с wgId
  const { user, token } = isAuthenticated();
  const tpId = state.curTpItem.tpId; // Получаем tpId из контекста
  const prodId = state.curTpItem.prodId; // Получаем prodId из контекста


  useEffect(() => {
    // Функция для загрузки данных, связанных с wgId
    const loadWgData = async () => {
      // здесь можно подгружать данные с сервера
      // например, запрос к API для получения wgName и wgUnName по wgId
      const fetchedData = state.workGroups;
      setWgData(fetchedData);
    };

    loadWgData();
  }, [operation.Id]);

  useEffect(() => {
    setOperation(state.tpAddOpsTemplate.operations[index]);
  }, [state.tpAddOpsTemplate.operations, index]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedOperation = {
      ...operation,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    };
    setOperation(updatedOperation);

    const updatedOperations = state.tpAddOpsTemplate.operations.map((op, i) =>
      i === index ? updatedOperation : op
    );

    dispatch({
      type: "SET_TP_ADD_OPS_TEMPLATE",
      payload: { ...state.tpAddOpsTemplate, operations: updatedOperations },
    });
  };

  const handleButtonClick = async () => {
    try {
      const response = await addOperationToTechProcess(token, user._id, tpId, prodId, operation);
      console.log("Operation added successfully:", response);

      // Обновляем состояние curProdIdTrigger
      dispatch({ type: "SET_CUR_PROD_ID_TRIGGER", payload: state.curProdIdTrigger + 1 });
    } catch (err) {
      console.error("Error adding operation:", err);
    }
  };

  return (
    <li className="list-group-item d-flex align-items-center">
      <div className="form-group isSelect mr-3">
        <input
          type="checkbox"
          id={`isSelect-${index}`}
          name="isSelected"
          className="form-check-input"
          checked={operation.isSelected === 1}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group num mr-3">
        <input
          type="number"
          id={`num-${index}`}
          name="num"
          className="form-control"
          value={operation.num}
          onChange={handleInputChange}
          placeholder="Номер операции"
        />
      </div>
      <div className="form-group wgId mr-3">
        <select
          id={`wgId-${index}`}
          name="wgId"
          className="form-control"
          value={operation.wgId}
          onChange={handleInputChange}
        >
          <option value="" disabled>Тип операции</option>
          {wgData.map((item) => (
            <option key={item.Id} value={item.Id}>
              {item.name} ({item.wgUnName}) {item.wgUnName === 4 ? ", c" : ""}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group qttToOne mr-3">
        <input
          type="number"
          step="0.01"
          id={`qttToOne-${index}`}
          name="qttToOne"
          className="form-control"
          value={operation.qttToOne}
          onChange={handleInputChange}
          placeholder="Количество на одну деталь"
        />
      </div>
      <div className="form-group qtt mr-3">
        <input
          type="number"
          id={`qtt-${index}`}
          name="qtt"
          className="form-control"
          value={operation.qtt}
          onChange={handleInputChange}
          placeholder="Количество единиц измерения"
        />
      </div>
      <button
        className="btn btn-danger mr-2"
        onClick={() => onDelete(index)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <button className="btn btn-info" onClick={handleButtonClick}>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </li>
  );
};

export default TpAddFormListItem;