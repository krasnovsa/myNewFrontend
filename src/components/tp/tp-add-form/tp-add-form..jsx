import React, { useContext } from "react";
import { CurrentAppContext } from "../../../contexts/currentApp";
import TpAddFormList from "../tp-add-form-list/tp-add-form-list";

const TpAddForm = () => {
  const [state, dispatch] = useContext(CurrentAppContext);
    const { tpAddOpsTemplate } = state;

  const handleLengthChange = (e) => {
    const { value } = e.target;
    dispatch({
      type: "SET_TP_ADD_OPS_TEMPLATE",
      payload: { ...tpAddOpsTemplate, length: value },
    });
  };

  const createProcess = () => {
    // Логика для создания техпроцесса
    console.log("Техпроцесс создан с помощью шаблона ", tpAddOpsTemplate);
  };


  return (
    <div>
      <label>
        Длина заготовки:
        <input
          type="number"
          value={tpAddOpsTemplate.length}
          onChange={handleLengthChange}
        />
      </label>
      <TpAddFormList />
      <button onClick={createProcess}>Создать техпроцесс</button>
    </div>
  );
};

export default TpAddForm;
