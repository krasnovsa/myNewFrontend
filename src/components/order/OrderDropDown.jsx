import React, { useContext } from "react";
import { CurrentAppContext } from "../../contexts/currentApp";
import { useHistory } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

function OrderDropDown(props) {
  const history = useHistory();
  const loadModeClickHandler =  (loadMode) => (e) =>{
    history.push(`${process.env.PUBLIC_URL}/orders/${loadMode}`);
  };

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle
          variant="secondary"
          id="dropdown-basic"
        ></Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={loadModeClickHandler(1)}>
            Ожидают закрытия
          </Dropdown.Item>
          <Dropdown.Item onClick={loadModeClickHandler(2)}>
            Ожидают открытия
          </Dropdown.Item>
          <Dropdown.Item onClick={loadModeClickHandler(3)}>
            Недавно созданные
          </Dropdown.Item>
          <Dropdown.Item onClick={loadModeClickHandler(4)}>
            Недавно закрытые
          </Dropdown.Item>
          <Dropdown.Item onClick={loadModeClickHandler(5)}>
            Ожидающие отгрузки
          </Dropdown.Item>
          <Dropdown.Item onClick={loadModeClickHandler(6)}>
            Проблемы в производстве
          </Dropdown.Item>
          <Dropdown.Item onClick={loadModeClickHandler(7)}>
            Проблемы с материалом
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default OrderDropDown;
