import React, { useContext } from "react";
import { CurrentAppContext } from "../../../contexts/currentApp";
import TpAddFormListItem from "../tp-add-form-list-item/tp-add-form-list-item";
import './styles.css'

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
    const updatedOperations = tpAddOpsTemplate.operations.filter(
      (_, i) => i !== index
    );

    dispatch({
      type: "SET_TP_ADD_OPS_TEMPLATE",
      payload: { ...tpAddOpsTemplate, operations: updatedOperations },
    });
  };

  const labels = {
    isSelect: "Выбрать",
    num: "Номер операции",
    wgId: "Тип операции",
    qttToOne: "Количество на одну деталь",
    qtt: "Количество единиц измерения",
  };

  return (
    <>
      <div className="tp-add-form-list-container">
        <ul className="list-group">
          <div className="add-form-header-grid-container">
            <div className="isSelect">
              {labels.isSelect}
            </div>
            <div className="num">
              {labels.num}
            </div>
            <div className="wgId">
              {labels.wgId}
            </div>
            <div className="qtt">
              {labels.qtt}
            </div>
            <div className="qttToOne">
              {labels.qttToOne}
            </div>
            <div className="btns">
              <button className="btn btn-primary mt-1" onClick={addOperation}>
                +
              </button>
            </div>
          </div>
          {tpAddOpsTemplate.operations.map((operation, index) => (
            <TpAddFormListItem
              key={index}
              index={index}
              onDelete={deleteOperation}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default TpAddFormList;
