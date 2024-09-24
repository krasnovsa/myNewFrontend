import React, { useContext } from "react";
import moment from "moment";
import { CurrentAppContext } from "../../contexts/currentApp";
import {getOneById} from "../../api/apiRdsr";
import {isAuthenticated} from '../../auth'

const RdsrItem = ({ rdsr }) => {
  const {
    rdId,
    // createdById,
    dateCreated,
    statusId,
    // typeId,
    // accId,
    // accTable,
    // btId,
    // propId,
    // reservId,
    // reservTable,
    // resId,
    // resTable,
    // accName,
    resName,
    oiSName,
    // btName,
    userName,
    statusName,
  } = rdsr;

  const {
    user: { _id = null },
  } = isAuthenticated();
  const { token } = isAuthenticated();

  const [state, dispatch] = useContext(CurrentAppContext);

  const {
    currentRdsr: { rdId: currentRdsrId = 0 },
  } = state;

  const handleOnClick = () => {
    getOneById(token, _id, rdId ? rdId : 0)
      .then((rdsr) => {
        if (rdsr) {
          return dispatch({ type: "SET_CURRENT_RDSR", payload: rdsr });
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <li
      className={`list-group-item flex-column align-items-start ${
        rdId == currentRdsrId ? "active" : ""
      }`}
      onClick={handleOnClick}
    >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">
          {resName}
          <span
            className={`badge badge-pill badge-${state.rdsrStatusTheme[statusId]}`}
          >
            {statusName}
          </span>
        </h5>
      </div>
      <p className="mb-1">{oiSName}</p>
      <div className="d-flex w-100 justify-content-between">
        <small className="mr-2">{userName}</small>
        <small>ID: {rdId}</small>
      </div>
      <div className="d-flex w-100 justify-content-between">
        <small className="mr-2">
          {moment(dateCreated).format("DD.MM.YYYY")}
        </small>
      </div>
    </li>
  );
};

export default RdsrItem;
