import React, { useContext } from "react";
import { CurrentAppContext } from "../../../contexts/currentApp";
import TpAddFormList from "../tp-add-form-list/tp-add-form-list";
import "./styles.css"; // Импортируем CSS-файл

function TpAddForm (props) {
  const [state, dispatch] = useContext(CurrentAppContext);
  const { tpAddOpsTemplate } = state;

  const handleLengthChange = (e) => {
    const { value } = e.target;
    dispatch({
      type: "SET_TP_ADD_OPS_TEMPLATE",
      payload: { ...tpAddOpsTemplate, length: value },
    });
  };

  const setLengthTo750 = () => {
    dispatch({
      type: "SET_TP_ADD_OPS_TEMPLATE",
      payload: { ...tpAddOpsTemplate, length: 750 },
    });
  };

  const createProcess = () => {
    // Логика для создания техпроцесса
    console.log("Техпроцесс создан с помощью шаблона ", tpAddOpsTemplate);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Добавление техпроцесса</h2>
      <TpAddFormList />
      <div className="form-group mt-4">
        <label htmlFor="lengthInput">Длина заготовки:</label>
        <input
          type="number"
          id="lengthInput"
          className="form-control"
          value={tpAddOpsTemplate.length}
          onChange={handleLengthChange}
        />
      </div>
      <button className="btn btn-secondary mr-2" onClick={setLengthTo750}>
        L=750 мм
      </button>
      <button className="btn btn-primary" onClick={createProcess}>
        Создать техпроцесс
      </button>
    </div>
  );
};

export default TpAddForm;