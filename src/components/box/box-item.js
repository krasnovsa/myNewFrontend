import React, { useContext } from "react";
import moment from "moment";
import { CurrentAppContext } from "../../contexts/currentApp";

const BoxItem = ({ box }) => {
  const { Id, prodName, shItId, qtt, cName, boxedByFIO, dateBoxed } = box;

  const [state, dispatch] = useContext(CurrentAppContext);

  const {
    currentBox: { Id: currentBoxId },
  } = state;

  const handleOnClick = () => {
    dispatch({ type: "SET_CURRENT_BOX", payload: box });
    console.log(box);
  };

  return (
    <li
      className={`list-group-item flex-column align-items-start ${
        Id === currentBoxId ? "active" : ""
      }`}
      onClick={handleOnClick}
    >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{prodName}</h5>{" "}
        <div>
          <span
            className={`mv-auto badge badge-pill badge-${
              shItId ? "primary" : "secondary"
            }`}
          >
            {qtt}
          </span>
        </div>
      </div>
      <p className="mb-1">{cName}</p>
      <div className="d-flex w-100 justify-content-between">
        <small className="mr-2">{boxedByFIO}</small>
        <small>ID: {Id}</small>
      </div>
      <div className="d-flex w-100 justify-content-between">
        <small className="mr-2">{moment(dateBoxed).format("DD.MM.YYYY")}</small>
      </div>
    </li>
  );
};

export default BoxItem;
