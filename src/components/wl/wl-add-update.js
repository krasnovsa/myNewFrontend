import React, { useState, useEffect, useContext } from "react";
import moment, { parseTwoDigitYear } from "moment";
import DatePicker from "react-date-picker";

import Layout from "../layout";
import PjSearch from "./pj-search";
import ErrorMessage from "../error-message";

//import MyScaner from "../scaner";
import { isAuthenticated } from "../../auth";
import { withRouter, useHistory } from "react-router-dom";
import { update, addNew } from "../../api/apiWl";
import { API } from "../../config";
import { CurrentAppContext } from "../../contexts/currentApp";

const WlAddUpdate = (props) => {
  //loadMode 1 update , 0 - addNew
  const [state, dispatch] = useContext(CurrentAppContext);

  const {
    user: { _id = null },
  } = isAuthenticated();
  const { token } = isAuthenticated();

  const { loadMode } = props;
  const history = useHistory();

  const [Error, setError] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  const [isShouldUpdate, setIsShouldUpdate] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [wl, setWl] = useState({});
  const [initPjId, setInitPjId] = useState(0);
  const { btList } = state;

  const maxDate = () => {
    let d = moment().toDate();
    return d;
  };

  const minDate = () => {
    let d = moment().add(-20, "d").toDate();

    return d;
  };

  const init = () => {
    if (loadMode == 1) {
      const { currentWl } = state;
      
      setWl({ ...wl, ...currentWl });
      setInitPjId(currentWl.pjId);
    } else {
      const today=moment().format('YYYY-MM-DD')
      const currentWl = {
        wlId: 0,
        wDate: today,
        wShift: 1,
        btId: 0,
        qtt: 0,
        tOne: 1,
        wName: "",
        btName: "",
        note: "",
        wTypeId: 0,
        pjId: 0,
        qttAgreed:0,
        isOpQttAgreed:false,
        unName:""
      };
      setWl({ ...wl, ...currentWl });
      setInitPjId(0);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (e) => {
    setWl({ ...wl, [name]: e.target.value });
    setError(false);
    setIsUpdated(false);
    setFormErrors([]);
    setIsShouldUpdate(false);
  };
  const handleDateChange = (date) => {
    console.log('new date', date)
    setWl({ ...wl, wDate: moment(date).format("YYYY-MM-DD") });
    setError(false);
    setIsUpdated(false);
    setFormErrors([]);
    setIsShouldUpdate(false);
  };

  const handleTOne = () => {
    
    setWl({ ...wl, tOne: 1 });
    
  };

  useEffect(() => {
    if (formErrors.length === 0&&isShouldUpdate) {
      let method = loadMode ? update : addNew;
      console.log('wl update' ,wl)
      method(token, _id, wl)
        .then((data) => {
          if (data.error) {
            console.log(data.error);
            setError(data.error);
          } else {
            console.log("update-add success");
            setIsUpdated(true);
            setError(false);
          }
        })
        .catch((err) => {
          console.log("update-add error");
          setError(err);
        });
    }
  }, [loadMode, formErrors, isShouldUpdate]);

  const redirectUser = (isUpdated) => {
    if (isUpdated) {
      setIsUpdated(false);
      //console.log("history ", history);
       history.push("/wl/byEmpl/pageNumber/1");
    }
  };

  const handleFoundPj = ({
    pjId,
    wName,
    isAgreed,
    tOne,
    isClosed,
    num,
    wTypeId,
    qttAgreed,
    isOpQttAgreed,
    note,
    unName
  }) => {
    setWl({
      ...wl,
      pjId: pjId,
      wName: wName,
      isAgreed: isAgreed,
      tOne: tOne,
      isClosed: isClosed,
      num: num,
      wTypeId: wTypeId,
      qttAgreed: qttAgreed,
      isOpQttAgreed: isOpQttAgreed,
      note:note, 
      unName:unName
    });
  };

  const isCnc = (wt) => {
    return wt === 1 || wt === 9 || wt === 55 ? true : false;
  };

  const parseDate = (strDate) => {
    let d = new Date(strDate);
    return d;
  };

  const checkFormErrors = () => {
    let errors = [];

    if (!(wl.wShift == 1 || wl.wShift == 2)) {
      errors.push("Не указана смена или смена указана неверно");
    }
    if (!wl.qtt > 0) {
      errors.push("Не указано количество"); 
    }
    if (!wl.btId > 0) {
      errors.push("Не выбрано оборудование");}
    console.log('formErrors', errors)
    setFormErrors(errors);
  };

  const submitHandler  = (e) => {
    e.preventDefault();
    checkFormErrors();
    setIsShouldUpdate(true);
  };

  const cancelHandler  = (e) => {
    e.preventDefault();
    setIsUpdated(true)
  };



  

  const wlUpdate = ({
    pjId,
    wName,
    isAgreed,
    btId,
    isClosed,
    qtt,
    tOne,
    note,
    wTypeId,
    wShift,
    wDate,
    wlId=0,
    qttAgreed,
    isOpQttAgreed,
    unName
  }) => (
    <form>
      <div className="card ">
        <h2 className="card-header card-header-1 ">{wName}</h2>
        <div className="card-body">
          <p className="card-p  mt-2">ПЗ № {pjId}</p>
          {(wlId>0)&&<p className="card-p  mt-2">id: {wlId}</p>}
        </div>
      </div>
      <div className="form-group">
        <label className="text-muted">Дата работы</label>
        <DatePicker
          value={parseDate(wDate)}
          onChange={handleDateChange}
          className={'m-2 "form-control"'}
          maxDate={maxDate()}
          minDate={minDate()}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Смена</label>
        <select
          value={wShift}
          className="form-control mb-2"
          onChange={handleChange("wShift")}
          type="number"
          required
        >
          <option value={1}>1</option>;<option value={2}>2</option>;
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">
          Количество операций
        </label>
        <input
          type="number"
          onChange={handleChange("qtt")}
          className="form-control"
          value={qtt}
          required
        />
      </div>
   
      <div className="form-group">


        <label className="text-muted"> {`Количество ${unName}  в операции ${isOpQttAgreed&&'фиксировано'}`} </label>
        
          <input
            type="number"
            disabled={isOpQttAgreed}
            onChange={handleChange("tOne")}
            className="form-control"
            value={isOpQttAgreed?qttAgreed:tOne}
            required
          />
        
      </div>

      <div className="form-group">
        <label className="text-muted">Оборудование</label>
        <select
          value={btId}
          className="form-control mb-2"
          onChange={handleChange("btId")}
          required
        >
           <option key={0} value={0}>
                  не выбрано
            </option>
          {btList &&
            btList.map(({ btId, btName }, i) => {
              return (
                <option key={btId} value={btId}>
                  {btName}
                </option>
              );
            })}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Примечание</label>
        <input
          type="text"
          onChange={handleChange("note")}
          className="form-control"
          value={note}
        />
      </div>
<div className="d-flex justify-content-end" >
        <button onClick={submitHandler} className="btn m-1 btn-primary">
        Выполнить
      </button>
      <button onClick={cancelHandler} className="btn m-1 btn-outline-primary">
        Отмена
      </button>
   
</div>
 </form>
  );

  return (
    <Layout
      title={`Отчет по работе ${loadMode ? "изменение" : "создание"}`}
      description={`${loadMode ? "Внесите изменения" : "заполните фому"} ...`}
      className="container-fluid"
    >
      {(!loadMode || initPjId) && (
        <PjSearch pjId={initPjId} handleFoundPj={handleFoundPj} />
      )}
{formErrors.length!==0 && <ErrorMessage message={formErrors[0]}/>}
      {/* <MyScaner /> */}

      {wl.pjId > 0 && wlUpdate(wl)}

      {redirectUser(isUpdated)}
      {Error && "Error " + Error.message}
      
    </Layout>
  );
};

export default withRouter(WlAddUpdate);
