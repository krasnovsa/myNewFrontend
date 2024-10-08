import React, { useContext, useState, useEffect } from "react";
import { CurrentAppContext } from "../../../contexts/currentApp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import "./styles.css"; // Импортируем CSS-файл

const TpAddFormListItem = ({ index, onDelete }) => {
  const [state, dispatch] = useContext(CurrentAppContext);
  const [operation, setOperation] = useState(
    state.tpAddOpsTemplate.operations[index]
  );
  const [wgData, setWgData] = useState([]); // данные связанные с wgId

  useEffect(() => {
    // Функция для загрузки данных, связанных с wgId
    const loadWgData = async () => {
      // здесь можно подгружать данные с сервера
      // например, запрос к API для получения wgName и wgUnName по wgId
      const fetchedData = state.workGroups
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
        className="btn btn-danger"
        onClick={() => onDelete(index)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </li>
  );
};

export default TpAddFormListItem;