import React, { useContext, useState, useEffect } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { Basket } from "react-bootstrap-icons";
import { CurrentAppContext } from "../../contexts/currentApp";
import MyModal from "../modal";
import { isAuthenticated } from "../../auth/index";
import { openCell, runDoc, checkAccess } from "../../api/apiGetTools";

const GtInfo = (props) => {
  const [state] = useContext(CurrentAppContext);
  const {
    currentGt: {
      accId,
      accName,
      resId,
      resTable,
      resName,
      reservId,
      reservDef,
      mainUn,
      resQtt,
      un1Name,
    },
  } = state;

  const [isAllowed, setIsAllowed] = useState(false);
  const [cellShouldOpen, setCellShouldOpen] = useState(false);
  const [isSubmittedBySystem, setIsSubmittedBySystem] = useState(false);
  const [isOpenShouldSubmit, setIsOpenShouldSubmit] = useState(false);
  const [qttValue, setQttValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDocShouldRun, setIsDocShouldRun] = useState(false);

  const {
    user: { _id = null },
  } = isAuthenticated();
  const { token } = isAuthenticated();

  useEffect(() => {
    if (!isSubmittedBySystem) {
      //check is allowed
      setIsLoading(true);
      checkAccess(token, _id, accId).then(({ access, error }) => {
        if (error) {
          setIsAllowed(false);
          return setIsLoading(false);
        }
        if (access === false) {
          setIsAllowed(false);
          return setIsLoading(false);
        }
      });
      setIsAllowed(true);
      setIsLoading(false);
      //check is should be open get toolboxId cellId
    }
  }, [_id, token, accId, resId, resTable, reservId, isSubmittedBySystem]);

  // opencell
  useEffect(() => {
    if (cellShouldOpen) {
      //open cell
      setIsLoading(true);
      openCell(token, _id, accId).then(({ error }) => {
        if (error) {
          setIsLoading(false);
          setCellShouldOpen(false);
          setIsOpenShouldSubmit(false);
          return console.log(error);
        }
        setIsLoading(false);
        setIsOpenShouldSubmit(true);
        setCellShouldOpen(false);
        console.log("cell is open");
      });
    }
  }, [cellShouldOpen]);

  useEffect(() => {
    if (isDocShouldRun) {
      // runing doc
      setIsLoading(true);
      runDoc(
        token,
        _id,
        accId,
        resId,
        resTable,
        reservId,
        qttValue,
        mainUn
      ).then(({ error }) => {
        if (error) {
          setIsLoading(false);
          setIsDocShouldRun(false);
          return console.log(error);
        }
        setIsLoading(false);
        setIsDocShouldRun(false);
        window.location.reload();
        console.log("success complitted");
      });
      console.log("runnind doc");
    }
  }, [isDocShouldRun]);

  useEffect(() => {
    if (isSubmittedBySystem) {
      setIsSubmittedBySystem(false);
    }
  }, [isSubmittedBySystem]);

  const submitGtHandler = () => {
    setIsOpenShouldSubmit(false);
    setIsDocShouldRun(true);
  };

  const denyGtHandler = () => {
    setIsOpenShouldSubmit(false);
    setIsDocShouldRun(false);
  };

  const showGt = () => {
    return (
      <div className="card ">
        {/* <h2 className="card-header card-header-1 ">{resName}</h2> */}
        <div className="card-body">
          {isAllowed ? 
            <div className="alert alert-success" role="alert">
              Доступ разрешен
            </div> : <div className="alert alert-danger" role="alert">
              В доступе отказано
            </div>
          }
          <p className="card-p  mt-2">
            Склад :
            <strong>
              {" "}
              {accId} {accName}{" "}
            </strong>
          </p>
          <p className="card-p  mt-2">
            Ресурс: <strong> {resName}</strong>
          </p>
          <p className="card-p  mt-2">
            Количество:<strong> {resQtt}  {un1Name}</strong>
          </p>
        </div>
        <form className="form-inline d-flex w-100 justify-content-between">
          <input
            type="number"
            className="form-control m-2"
            placeholder="укажите количество"
            value={qttValue}
            onChange={(e) => {
              setQttValue(e.target.value);
            }}
          />

          {isAllowed && resQtt >= qttValue && qttValue > 0 && (
            <MyModal
              modalHeader={"Возьмите инструмент"}
              modalBody={"Подтвердите получение"}
              onOk={submitGtHandler}
              onCancel={denyGtHandler}
              buttonClasses={"btn btn-outline-primary m-2"}
              buttonCaption={
                <div >
                  <Basket /> Получить
                </div>
              }
              showOk={isOpenShouldSubmit}
              onShow={() => setCellShouldOpen(true)}
            />
          )}
        </form>
      </div>
    );
  };

  return (
    <div>
      {accId && showGt(accId, accName, resName, resQtt, un1Name)}
      {!accId && "No selected"}
    </div>
  );
};

export default withRouter(GtInfo);
