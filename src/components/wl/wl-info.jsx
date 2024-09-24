import React, { useContext, useState, useEffect } from "react";
import { Redirect, withRouter, useHistory } from "react-router-dom";
import {
  Printer,
  Trash,
  PlusSquare,
  PencilSquare,
} from "react-bootstrap-icons";
import { Dropdown } from "react-bootstrap";
import Loader from "react-loader-spinner";

import { CurrentAppContext } from "../../contexts/currentApp";
//import MyModal from "../modal";
import { isAuthenticated } from "../../auth/index";
import { remove, getLabel } from "../../api/apiWl";
import Popup from '../pop-up'
import SliderAtt from '../att/sliderAtt/SliderAtt'

const WlInfo = (props) => {

  const [state] = useContext(CurrentAppContext);
  const {
    currentWl: {
      wlId,
      wDate,
      wShift,
      btId,
      qtt,
      tOne,
      wName,
      btName,
      note,
      wTypeId,
      pjId,
      isAgreed,
      sumSalMonth

    },
  } = state;
  const history = useHistory();
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [shouldAddNew, setShouldAddNew] = useState(false);
  const [shouldRemove, setShouldRemove] = useState(false);
  const [shouldPrint, setShouldPrint] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const {
    user: { _id = null },
  } = isAuthenticated();

  const { token } = isAuthenticated();
  const [popup, setPopup] = useState({
    isShow: false,
    alertClass: "",
    alertMessage: "",
  });



  useEffect(()=>{
    if(shouldRemove){
      remove(token, _id, wlId)
      .then((result)=>{
        if(result.error){        
         console.log('remove error ' & result.error)
        }
        console.log('delete success')
        window.location.reload();
      })
      .catch((err)=>{
       console.log('catch remove error ' & err)
      })
      .finally(()=>{
        setShouldRemove(false) 
      })    
  }},[shouldRemove])
  
  useEffect(()=>{
    if(shouldPrint){
      setIsLoading(true)
      getLabel(token, _id, wlId)
      .then((result)=>{
        if(result.error){        
         console.log('print send error ' & result.error)
         setPopup({
          isShow: true,
          alertClass: "dunger",
          alertMessage: `Printing error ${result.error}`,
        })}
        
        setPopup({
          isShow: true,
          alertClass: "success",
          alertMessage: result.message,
        });
      })
      .catch((err)=>{
       console.log('catch print error ' & err)
       setPopup({
        isShow: true,
        alertClass: "dunger",
        alertMessage: `Ошибка печати`})
      })
      .finally(()=>{
        setShouldPrint(false)
        setIsLoading(false)
      })    
  }},[shouldPrint])

 

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

  const updateHandler = () => {
    console.log("run update handler ");
    setShouldUpdate(true);
  };
  const addNewHandler = () => {
    setShouldAddNew(true);
  };

  const redirectToUpdate = (shouldUpdate) => {
    console.log("run redirect", shouldUpdate);
    if (shouldUpdate) {
      console.log("redirect update ");
      history.push("/wl/update");
      //return <Redirect to="/wl/update" />;
    }
  };

  const redirectToAddNew = (shouldAddnew) => {
    console.log("run redirect", shouldAddNew);
    if (shouldAddnew) {
      history.push("/wl/addNew");
    }
  };

  const isCnc = (wt) => {
    return wt === 1 || wt === 9 || wt === 55 ? true : false;
  };

  const printHandler = () => {
    setShouldPrint(true);
  };
  const deleteHandler = (e) => {
    if(window.confirm('Вы уверены что хотите удалить этот отчет?')){setShouldRemove(true)};
    
  };
  
  const showWl = () => {
    return (
      <div className="card ">
        <div className="card-header card-header-1 align-items-center">
          <h2>{wName}</h2>
          <div className="d-flex justify-content-between">
            <span className={`badge badge-pill badge-primary h-50`}>
              {isAgreed ? "согласовано" : "пока не согласовано"}
            </span>
            <span className={`badge badge-pill badge-info h-50`}>
              {sumSalMonth>0 && `за месяц ${sumSalMonth.toFixed(2)} руб.`}
            </span>
            
            <div className="">
              <Dropdown>
                <Dropdown.Toggle
                  variant="secondary"
                  id="dropdown-basic"
                ></Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={addNewHandler}>
                    <div>
                      <PlusSquare /> Добавить
                    </div>
                  </Dropdown.Item>
                  {!isAgreed && (
                    <Dropdown.Item onClick={updateHandler}>
                      <div>
                        <PencilSquare /> Изменить
                      </div>
                    </Dropdown.Item>
                  )}
                  {!isAgreed && (
                    <Dropdown.Item onClick={deleteHandler}>
                      <Trash /> Удалить
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item onClick={printHandler}>
                    <Printer /> Печать
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            
          </div>
          <SliderAtt table='WorkLog' keyValue={wlId}/>
        </div>
       
      </div>
    );
  };

  return (
    <div>
      
      { showWl()}
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
      {shouldUpdate && redirectToUpdate(shouldUpdate)}
      {shouldAddNew && redirectToAddNew(shouldAddNew)}
    </div>
  );
};

export default withRouter(WlInfo);
