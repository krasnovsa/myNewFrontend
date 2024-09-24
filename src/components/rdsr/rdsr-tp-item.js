import React, { useState } from "react";
import MyModal from "../modal";
import { Pen, Trash } from "react-bootstrap-icons";
import RdsrTpEditForm from "./rdsr-tp-edit-form";

const RdsrTpItem = ({ tpItem, deleteHandler, statusId, editHandler, restQtt }) => {
  const { Id, rdId, qtt, len, resultType, timeOne } = tpItem;

  const typeName = ["основная заготовка", "вторичная заготовка", "отходы"];
  const typeStyle = ["primary", "secondary", "warning"];
  const deleteItemHandler = () => {
    deleteHandler(Id);
  };

  const itemEditHandler = (newItem) => {
    setIsSubmitted(false);
    editHandler(newItem);
  };
  const isValidHandler = (errCount) => {
    errCount > 0 ? setIsFormValid(false) : setIsFormValid(true);
  };

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  return (
    <li className={`list-group-item`}>
      <div className=" d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-1  ">
            {len} мм x {qtt} шт = {(len * qtt) / 1000} метров.
          </h5>
          <h5 className="mb-1  ">Тшт = {timeOne ? timeOne : 0} сек/шт</h5>
        </div>

        {statusId == 50 && (
          <div className="d-flex justify-content-between align-items-center">
            <MyModal
              modalHeader={"Editing item"}
              modalBody={
                <RdsrTpEditForm
                  tpItem={tpItem}
                  isSubmitted={isSubmitted}
                  submitHandler={itemEditHandler}
                  checkIsValid={isValidHandler}
                  restQtt={restQtt}
                  prevLen = {len}
                  prevQtt={qtt}
                />
              }
              onOk={() => {
                setIsSubmitted(true);
              }}
              showOk={isFormValid}
              onCancel={() => {}}
              buttonClasses={"btn btn-small btn-outline-primary mr-1 mt-1"}
              buttonCaption={
                <div>
                  <Pen />
                </div>
              }
            />
            <button
              className="btn btn-small btn-outline-danger mr-1 mt-1"
              onClick={deleteItemHandler}
            >
              <Trash />
            </button>
          </div>
        )}
      </div>
      <small className={`badge badge-pill badge-${typeStyle[resultType]}`}>
        {typeName[resultType]}
      </small>
    </li>
  );
};

export default RdsrTpItem;
