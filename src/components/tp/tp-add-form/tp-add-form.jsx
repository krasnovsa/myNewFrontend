import React, { useContext } from "react";
import { CurrentAppContext } from "../../../contexts/currentApp";
import TpAddFormList from "../tp-add-form-list/tp-add-form-list";
import { createTechProcessWithOperations } from "../../../api/apiTp"; // Импортируем метод для создания техпроцесса
import "./styles.css"; // Импортируем CSS-файл
import { isAuthenticated } from "../../../auth/index";

function TpAddForm(props) {
  const [state, dispatch] = useContext(CurrentAppContext);
  const { tpAddOpsTemplate, curProduct } = state;
  const { user, token } = isAuthenticated();

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

  const setLenghtToCurProduct = () => {
    if (curProduct && curProduct.lenght) {
      dispatch({
        type: "SET_TP_ADD_OPS_TEMPLATE",
        payload: { ...tpAddOpsTemplate, length: curProduct.lenght },
      });
    }
  };

  const createProcess = async () => {
    try {
      // Обновляем prodId в tpAddOpsTemplate
      const updatedTemplate = { ...tpAddOpsTemplate, prodId: curProduct.Id };
      dispatch({
        type: "SET_TP_ADD_OPS_TEMPLATE",
        payload: updatedTemplate,
      });

      // Выполняем метод для создания техпроцесса
      await createTechProcessWithOperations(token, user._id, updatedTemplate);
      console.log("Техпроцесс создан с помощью шаблона ", updatedTemplate);
    } catch (err) {
      console.error("Ошибка при создании техпроцесса:", err);
    }
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
      {curProduct && curProduct.lenght && (
        <button className="btn btn-secondary mr-2" onClick={setLenghtToCurProduct}>
          L={curProduct.lenght} мм
        </button>
      )}
      <button className="btn btn-primary" onClick={createProcess}>
        {curProduct ? `Создать техпроцесс для ${curProduct.name}` : "Создать техпроцесс"}
      </button>
    </div>
  );
}

export default TpAddForm;