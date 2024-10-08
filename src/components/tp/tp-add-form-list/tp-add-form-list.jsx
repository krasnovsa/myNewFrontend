import React, { useContext } from "react";
import { CurrentAppContext } from "../../../contexts/currentApp";
import TpAddFormListItem from "../tp-add-form-list-item/tp-add-form-list-item";

const TpAddFormList = () => {
  const [state, dispatch]   = useContext(CurrentAppContext);

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

  return (
    <div>
      {tpAddOpsTemplate.operations.map((operation, index) => (
        <TpAddFormListItem key={index} index={index} />
      ))}
      <button onClick={addOperation}>Добавить операцию</button>
    </div>
  );
};

export default TpAddFormList;
