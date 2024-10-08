import React, { useContext, useState, useEffect } from "react";
import { CurrentAppContext } from "../../../contexts/currentApp";

const TpAddFormListItem = ({ index }) => {
  const { state, dispatch } = useContext(CurrentAppContext);
  const [operation, setOperation] = useState(
    state.tpAddOpsTemplate.operations[index]
  );
  const [wgData, setWgData] = useState([]); // данные связанные с wgId

  useEffect(() => {
    // Функция для загрузки данных, связанных с wgId
    const loadWgData = async () => {
      // здесь можно подгружать данные с сервера
      // например, запрос к API для получения wgName и wgUnName по wgId
      const fetchedData = [
        { toFirm: "tm", Id: 1, name: "RF", wgUnName: 4, isCNC: 1 },
        { toFirm: "tm", Id: 2, name: "VT", wgUnName: 4, isCNC: 1 },
        { toFirm: "pr", Id: 3, name: "VC", wgUnName: 4, isCNC: 1 },
        { toFirm: "adm", Id: 4, name: "RSL", wgUnName: 4, isCNC: 1 },
        { toFirm: "tm", Id: 5, name: "RF+C", wgUnName: 4, isCNC: 1 },
      ];
      setWgData(fetchedData);
    };

    loadWgData();
  }, [operation.wgId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedOperation = { ...operation, [name]: value };
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
    <div>
      <label>
        Номер операции:
        <input
          type="number"
          name="num"
          value={operation.num}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Тип операции:
        <select name="wgId" value={operation.wgId} onChange={handleInputChange}>
          {wgData.map((item) => (
            <option key={item.Id} value={item.Id}>
              {item.name} ({item.wgUnName})
            </option>
          ))}
        </select>
      </label>
      <label>
        Количество на одну деталь:
        <input
          type="number"
          step="0.01"
          name="qttToOne"
          value={operation.qttToOne}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Количество единиц измерения:
        <input
          type="number"
          name="qtt"
          value={operation.qtt}
          onChange={handleInputChange}
        />
      </label>
    </div>
  );
};

export default TpAddFormListItem;
