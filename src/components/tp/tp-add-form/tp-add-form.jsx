import React, { useContext, useEffect, useState } from "react";
import { CurrentAppContext } from "../../../contexts/currentApp";
import TpAddFormList from "../tp-add-form-list/tp-add-form-list";
import { createTechProcessWithOperations } from "../../../api/apiTp"; // Импортируем метод для создания техпроцесса
import { getProductById } from "../../../api/apiProduct"; // Импортируем метод для получения информации о продукте
import "./styles.css"; // Импортируем CSS-файл
import { isAuthenticated } from "../../../auth/index";

function TpAddForm({ prodId }) {
  const [state, dispatch] = useContext(CurrentAppContext);
  const { tpAddOpsTemplate } = state;
  const { user, token } = isAuthenticated();
  const [productLength, setProductLength] = useState(null);
  const [productName, setProductName] = useState("");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const product = await getProductById(prodId);
        setProductLength(product.lenght);
        setProductName(product.name);
      } catch (err) {
        console.error("Ошибка при получении данных о продукте:", err);
      }
    };

    fetchProductData();
  }, [prodId]);

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

  const setLenghtToProductLength = () => {
    if (productLength) {
      dispatch({
        type: "SET_TP_ADD_OPS_TEMPLATE",
        payload: { ...tpAddOpsTemplate, length: productLength },
      });
    }
  };

  const createProcess = async () => {
    try {
      // Обновляем prodId в tpAddOpsTemplate
      const updatedTemplate = { ...tpAddOpsTemplate, prodId: prodId };
      dispatch({
        type: "SET_TP_ADD_OPS_TEMPLATE",
        payload: updatedTemplate,
      });

      // Выполняем метод для создания техпроцесса
      await createTechProcessWithOperations(updatedTemplate);
      console.log("Техпроцесс создан с помощью шаблона ", updatedTemplate);
    } catch (err) {
      console.error("Ошибка при создании техпроцесса:", err);
    }
  };

  return (
    <div className="tp-add-grid-container mt-1 h-100">
      <div className="list">
      <TpAddFormList />
      </div>
      <div className="len-input form-group mb-1">
        <label htmlFor="lengthInput">Длина заготовки:</label>
        <input
          type="number"
          id="lengthInput"
          className="form-control"
          value={tpAddOpsTemplate.length}
          onChange={handleLengthChange}
        />
      </div>
      <div className="btns form-group mb-1">
      <button className="btn btn-secondary mr-3" onClick={setLengthTo750}>
        L=750 мм
      </button>
      {productLength && (
        <button
          className="btn btn-secondary mr-2"
          onClick={setLenghtToProductLength}
        >
          L={productLength} мм
        </button>
      )}

      <button className="btn btn-primary" onClick={createProcess}>
        {productName
          ? `Создать техпроцесс для ${productName}`
          : "Создать техпроцесс"}
      </button>
      </div>
    </div>
  );
}

export default TpAddForm;
