import React, { useContext, useState, useEffect } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { Trash, Printer, PlusSquare, Exclude } from "react-bootstrap-icons";
import Loader from "react-loader-spinner";

import moment from "moment";
import { CurrentAppContext } from "../../contexts/currentApp";

import { isAuthenticated } from "../../auth";
import { double, remove, printLabel } from "../../api/apiBox";
import MyModal from "../modal";
import Popup from '../pop-up'


const BoxInfo = (props) => {
  const [state] = useContext(CurrentAppContext);
  const {
    currentBox: {
      prodName,
      cName,
      fName,
      qtt,
      Id,
      dateBoxed,
      boxedByFIO,
      shItId,
      mass,
    },
  } = state;

  const {
    user: { _id = null },
  } = isAuthenticated();
  const { token } = isAuthenticated();

  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [shouldAddnew, setShouldAddnew] = useState(false);
  const [popup, setPopup] = useState({
    isShow: false,
    alertClass: "",
    alertMessage: "",
  });
  const [isLoading, setIsLoading] = useState(false)
  

  const updateHandler = () => {
    setShouldUpdate(true);
    console.log("shouldUpdate: ", shouldUpdate);
  };

  const addnewHandler = () => {
    setShouldAddnew(true);
    console.log("shouldAddnew: ", shouldAddnew);
  };

  const deleteHandler = () => {
    console.log("delete ");
    remove(token, _id, Id);
    window.location.reload();
  };

  const doubleHandler = () => {
    double(token, _id, Id);
    window.location.reload();
  };

  const printHandler = () => {
setIsLoading(true)
    printLabel(token, _id, Id)
      .then((res) => {
        console.log(res.message);
        setPopup({
          isShow: true,
          alertClass: "success",
          alertMessage: res.message,
        });
      })
      .catch((error) => {
        console.log("printing error");
        setPopup({
          isShow: true,
          alertClass: "dunger",
          alertMessage: `Printing error ${error}`,
        });
      }).finally(()=>{
        setIsLoading(false)
      }

      );
  };

  useEffect(() => {
    if (popup.isShow) {
      const timer = setTimeout(
        () => {
          setPopup({
            ...popup,
            isShow: false,
            alertClass: "",
            alertMessage: "",
          });
        },

        3000
      );
      return () => clearTimeout(timer);
    }
  }, [popup]);

  const redirectToUpdate = (shouldUpdate) => {
    console.log("run redirect", shouldUpdate);

    if (shouldUpdate) {
      return <Redirect to="/box/update" />;
    }
  };

  const redirectToAddnew = (shouldAddnew) => {
    console.log("run redirect", shouldAddnew);

    if (shouldAddnew) {
      return <Redirect to="/box/addnew" />;
    }
  };

  const showBox = () => {
    return (
      <div className="card ">
        <h2 className="card-header card-header-1 ">{prodName}</h2>
        <div className="card-body">
          <p className="card-p  mt-2">
            Id :<strong> {Id} </strong>
          </p>
          <p className="card-p  mt-2">
            Заказчик: <strong> {cName}</strong>
          </p>
          <p className="card-p  mt-2">
            Поставщик: <strong> {fName}</strong>
          </p>
          <p className="card-p  mt-2">
            Количество:<strong> {qtt} шт</strong>
          </p>
          <p className="card-p  mt-2">
            Масса: <strong> {mass} кг</strong>
          </p>
          <p className="card-p  mt-2">
            Упаковал: <strong> {boxedByFIO}</strong>
          </p>
          <p className="card-p  mt-2">
            Дата упаковки: 
            <strong> {moment(dateBoxed).format("DD.MM.YYYY")}</strong>
          </p>
          <p className="card-p  mt-2">
            Номер отгрузки: <strong> {shItId || "not yet shipped"}</strong>
          </p>

          

          <div className="">
            <button
              className="btn btn-outline-success  m-2"
              onClick={printHandler}
            >
              <Printer /> Печать
            </button>

            <button
              className="btn btn-outline-success  m-2"
              onClick={addnewHandler}
            >
              <PlusSquare /> Новая коробка
            </button>

            <div>
              <MyModal
                modalHeader={"Подтвердите действие"}
                modalBody={"Вы хотите дублировать эту коробку?"}
                onOk={doubleHandler}
                buttonClasses={"btn btn-outline-danger m-2"}
                onCancel={() => {}}
                buttonCaption={<div>Дублировать</div>}
              />
              {!shItId && (
                <button
                  className="btn btn-outline-warning  m-2"
                  onClick={updateHandler}
                  style={{ display: "inline-block" }}
                >
                  Изменить
                </button>
              )}
              {!shItId && (
                <MyModal
                  modalHeader={"Подтвердите удаление"}
                  modalBody={"Вы  хотите удалить коробку?"}
                  onOk={deleteHandler}
                  onCancel={() => {}}
                  buttonClasses={"btn btn-outline-danger m-2"}
                  buttonCaption={
                    <div>
                      <Trash /> Удалить
                    </div>
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {popup.isShow && Popup(popup)}
      <div className="d-flex justify-content-center">
        {isLoading && (
          <Loader
            type="Puff"
            color="#007bff"
            height={70}
            width={70}
            timeout={5000} //3 secs
          />
        )}
      </div>
      {prodName && showBox(prodName, cName, fName, qtt)}
      {!prodName && "No box"}
      {shouldUpdate && redirectToUpdate(shouldUpdate)}
      {shouldAddnew && redirectToAddnew(shouldAddnew)}
    </div>
  );
};

export default withRouter(BoxInfo);
