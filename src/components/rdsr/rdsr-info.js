import React, { useContext, useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import moment from "moment";
import {
  Trash,
  Printer,
  PlusSquare,
  Pencil,
  Check,
  Arrow90degLeft,
} from "react-bootstrap-icons";
import { Dropdown } from "react-bootstrap";

import { CurrentAppContext } from "../../contexts/currentApp";

import { isAuthenticated } from "../../auth";
import {
  update,
  getOneById,
  changeStatus,
  addByResTicket,
} from "../../api/apiRdsr";
import MyModal from "../modal";
import RdsrTpList from "./rdsr-tp-list";
import RdsrEditForm from "./rdsr-edit-form";
import RdsrAddForm from "./rdsr-add-form";

function RdsrInfo(props) {
  const [state, dispatch] = useContext(CurrentAppContext);
  const {
    rdsrQtts,
    rdsrStatusTheme,
    rdsrListChanged,
    currentRdsr: {
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
      accName,
      resName,
      oiSName,
      btName,
      userName,
      resQttCalc,
      resQttTicket,
      resQttFact,
      statusName,
    },
  } = state;

  let history = useHistory();

  const {
    token,
    user: { _id = null },
  } = isAuthenticated();

  const [popup, setPopup] = useState({
    isShow: false,
    alertClass: "",
    alertMessage: "",
  });

  useEffect(() => {}, [state]);

  const showPopup = (popup) => {
    return (
      <div className={`alert alert-${popup.alertClass}`} role="alert">
        {popup.alertMessage}
      </div>
    );
  };

  const changeRdsrStatus = (statusName) => {
    return changeStatus(token, _id, rdId, statusName)
      .then(() => {
        return getOneById(token, _id, rdId);
      })
      .then((updatedRdsr) => {
        dispatch({ type: "SET_CURRENT_RDSR", payload: updatedRdsr });
      })
      .catch((err) => {
        console.log(`${statusName} error`, err);
      });
  };

  const printHandler = () => {
    history.push(`/rdsr-print/${rdId}`);
  };

  const deleteHandler = () => {
    changeRdsrStatus("remove").then(() => {
      dispatch({ type: "SET_RDSRLIST_CHANGED", payload: !rdsrListChanged });
    });
  };
  const addNewHandler = ({ ticketId }) => {
    setIsSubmitted(false);
    addByResTicket(token, _id, ticketId).then(() => {
      dispatch({ type: "SET_RDSRLIST_CHANGED", payload: !rdsrListChanged });
    });
  };

  const entryHandler = () => {
    changeRdsrStatus("entry");
  };
  const saveHandler = () => {
    changeRdsrStatus("save");
  };

  const unsaveHandler = () => {
    changeRdsrStatus("unsave");
  };

  const cancelEntryingHandler = () => {
    changeRdsrStatus("unentry");
  };

  const updateHandler = (newRdsr) => {
    setIsSubmitted(false);

    update(token, _id, newRdsr)
      .then(() => {
        console.log("newRdsr =", newRdsr);
        return getOneById(token, _id, newRdsr.rdId);
      })
      .then((updatedRdsr) => {
        dispatch({ type: "SET_CURRENT_RDSR", payload: updatedRdsr });
      })
      .catch((err) => {
        console.log("update error", err);
      });
  };

  const isValidHandler = (errCount) => {
    errCount > 0 ? setIsFormValid(false) : setIsFormValid(true);
  };

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const updateModal = (rdsr) => {
    return (
      <MyModal
        modalHeader={"Редактирование документа"}
        modalBody={
          <RdsrEditForm
            rdsr={rdsr}
            isSubmitted={isSubmitted}
            submitHandler={updateHandler}
            checkIsValid={isValidHandler}
          />
        }
        onOk={() => {
          setIsSubmitted(true);
        }}
        showOk={isFormValid}
        onCancel={() => {}}
        buttonClasses={""}
        buttonCaption={
          <button className="btn btn-outline-info">
            <Pencil /> Редактировать
          </button>
        }
      />
    );
  };

  const addModal = () => {
    return (
      <MyModal
        modalHeader={"Добавление документа по номеру этикетки"}
        modalBody={
          <RdsrAddForm
            isSubmitted={isSubmitted}
            submitHandler={addNewHandler}
            checkIsValid={isValidHandler}
          />
        }
        onOk={() => {
          setIsSubmitted(true);
        }}
        showOk={isFormValid}
        onCancel={() => {}}
        buttonClasses={""}
        buttonCaption={
          <div>
            <PlusSquare /> Создать
          </div>
        }
      />
    );
  };

  const showRdsr = () => {
    console.log(" state is ", state);
    return (
      <div className="card ">
        <div className="card-header card-header-1 d-flex justify-content-between align-items-center">
          <div>
            <h2>{resName}</h2>
            <span
              className={`badge badge-pill badge-${rdsrStatusTheme[statusId]}`}
            >
              {" "}
              {statusName}
            </span>
          </div>
          <div className="">
            <Dropdown>
              <Dropdown.Toggle
                variant="secondary"
                id="dropdown-basic"
              ></Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={printHandler}>
                  <Printer /> Печать
                </Dropdown.Item>
                <Dropdown.Item> {addModal()} </Dropdown.Item>

                {rdsrQtts.isValid === true && statusId == 50 && (
                  <Dropdown.Item onClick={saveHandler}>
                    <Check /> Сохранить
                  </Dropdown.Item>
                )}
                {statusId == 51 && (
                  <Dropdown.Item onClick={unsaveHandler}>
                    <Arrow90degLeft /> Отменить сохранение
                  </Dropdown.Item>
                )}
                {statusId == 51 && (
                  <Dropdown.Item onClick={entryHandler}>
                    <Check /> Провести
                  </Dropdown.Item>
                )}
                {statusId == 52 && (
                  <Dropdown.Item onClick={cancelEntryingHandler}>
                    <Arrow90degLeft /> Отменить проведение
                  </Dropdown.Item>
                )}
                {(statusId == 50 || statusId == 51) && (
                  <Dropdown.Item>
                    {
                      <MyModal
                        modalHeader={"Confirm deleting box"}
                        modalBody={"Do you really whant to delete this box?"}
                        onOk={deleteHandler}
                        onCancel={() => {}}
                        buttonClasses={"btn btn-danger "}
                        buttonCaption={
                          <div>
                            <Trash /> Удалить{" "}
                          </div>
                        }
                      />
                    }
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="card-body">
          <p className="card-p  mt-2">
            Id :<strong> {rdId} </strong>
          </p>
          <p className="card-p  mt-2">
            Сотрудник:<strong> {userName}</strong>
          </p>

          <p className="card-p  mt-2">
            Склад:<strong> {accName} </strong>
          </p>
          <p className="card-p  mt-2">
            Бронь:<strong> {oiSName}</strong>
          </p>
          <p className="card-p  mt-2">
            Дата:<strong> {moment(dateCreated).format("DD.MM.YYYY")}</strong>
          </p>
          <p className="card-p  mt-2">
            Расчетное количество:<strong> {resQttCalc} метров</strong>
          </p>
          <br />
          <div className="d-flex justify-content-between align-items-center">
            <div className="">
              <p className="card-p  mt-2">
                Фактическое количество:<strong> {resQttFact} метров</strong>
              </p>
              <p className="card-p  mt-2">
                Станок:<strong> {btName}</strong>
              </p>
            </div>
            <div className="">
              {statusId == 50 && updateModal(state.currentRdsr)}
            </div>
          </div>

          {popup.isShow && showPopup(popup)}

          <div className="mt2">
            <RdsrTpList
              rdId={rdId}
              resQttFact={resQttFact}
              resQttTicket={resQttTicket}
              statusId={statusId}
              
            />
          </div>
        </div>
      </div>
    );
  };

  return showRdsr();
}

export default withRouter(RdsrInfo);
