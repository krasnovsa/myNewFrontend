import React, { useContext } from "react";
import { CurrentAppContext } from "../../../contexts/currentApp";
import TpAddFormListItem from "../tp-add-form-list-item/tp-add-form-list-item";
import "./styles.css"; // Импортируем CSS-файл

const TpAddFormList = () => {
  const [state, dispatch] = useContext(CurrentAppContext);

  // Добавляем проверку на случай, если state не определен
  if (!state || !state.tpAddOpsTemplate) {
    return <div>Loading...</div>;
  }

  const { tpAddOpsTemplate } = state;

  const addOperation = () => {
    const newOperation = {
      isSelected: 0,
      num: 10,
      Id: 1,
      qttToOne: 1.0,
      qtt: 0,
    };

    dispatch({
      type: "SET_TP_ADD_OPS_TEMPLATE",
      payload: {
        ...tpAddOpsTemplate,
        operations: [...tpAddOpsTemplate.operations, newOperation],
      },
    });
  };

  const deleteOperation = (index) => {
    const updatedOperations = tpAddOpsTemplate.operations.filter((_, i) => i !== index);

    dispatch({
      type: "SET_TP_ADD_OPS_TEMPLATE",
      payload: { ...tpAddOpsTemplate, operations: updatedOperations },
    });
  };

  const labels = {
    num: "Номер операции",
    wgId: "Тип операции",
    qttToOne: "Количество на одну деталь",
    qtt: "Количество единиц измерения",
  };

  return (
    <>
    <div className="tp-add-form-list-container">
      <ul className="list-group">
        <li className="list-group-item d-flex align-items-center">
          <div className="form-group isSelect mr-3">
            <label>Выбрать</label>
          </div>
          <div className="form-group num mr-3">
            <label>{labels.num}</label>
          </div>
          <div className="form-group wgId mr-3">
            <label>{labels.wgId}</label>
          </div>
          <div className="form-group qttToOne mr-3">
            <label>{labels.qttToOne}</label>
          </div>
          <div className="form-group qtt">
            <label>{labels.qtt}</label>
          </div>
        </li>
        {tpAddOpsTemplate.operations.map((operation, index) => (
          <TpAddFormListItem key={index} index={index} onDelete={deleteOperation} />
        ))}
      </ul>

    </div>
        <button className="btn btn-primary mt-3" onClick={addOperation}>
        Добавить операцию
      </button> 
       </>
  );
};

export default TpAddFormList;