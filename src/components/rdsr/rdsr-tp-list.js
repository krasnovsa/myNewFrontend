import React, { useState, useEffect, useContext } from "react";
import { PlusSquare } from "react-bootstrap-icons";

import RdsrTpItem from "./rdsr-tp-item";
import ErrorMessage from "../error-message";
import {
  getTp,
  updateTpItem,
  deleteTpItem,
  insertTpItem,
} from "../../api/apiRdsrTp";
import { isAuthenticated } from "../../auth/index";
import { CurrentAppContext } from "../../contexts/currentApp";

import MyModal from "../modal";
import RdsrTpEditForm from "./rdsr-tp-edit-form";

const RdsrTpList = ({ rdId, resQttFact, statusId }) => {
  const [rdsrTp, setRdsrTp] = useState([]);
  const [isTpShouldRequery, setIsTpShouldReuery] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [{rdsrQtts}, dispatch] = useContext(CurrentAppContext);

  const { token, 
    user: { _id = null },
  } = isAuthenticated();

  

  useEffect(() => {
    setIsLoading(true);

    getTp(token, _id, rdId)
      .then((data) => {
        setIsLoading(false);
        if (data.error) {
          setError(data.error);
          setRdsrTp([]);
          setIsTpShouldReuery(false);
        } else {
          setError(false);
          setRdsrTp(data.recordset);
          setIsTpShouldReuery(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.error);
        setRdsrTp([]);
        setIsTpShouldReuery(false);
      });

  }, [_id, token, rdId, isTpShouldRequery]);

useEffect(()=>{
 calcQtts(rdsrTp)
 }, [,rdsrTp, resQttFact])

  const calcQtts = (items) => {
    let usedQtt = (items.length
      ? items.reduce((accumulator, currentValue) => {
          return accumulator + (currentValue.qtt * currentValue.len) / 1000;
        }, 0)
      : 0).toFixed(3);
    let restQtt = (resQttFact - usedQtt).toFixed(3);
    
    return dispatch({ type: "SET_RDSR_QTTS", payload: {
      usedQtt: usedQtt,
      restQtt: restQtt,
      isValid: restQtt>=0?true:false
    } });
  };

  const deleteItemHandler = (Id) => 
  {deleteTpItem(token, _id, Id)
    .then(() => setIsTpShouldReuery(true))
    .catch(err=>console.log('delete error',err));
  };

  const itemEditHandler = (newItem) => {
    setIsSubmitted(false);
    if(newItem.Id>0){
      updateTpItem(token, _id, newItem)
      .then(() => setIsTpShouldReuery(true))
      .catch(err=>console.log('update error',err));
      return
    }
      insertTpItem(token, _id, newItem)
      .then(() => setIsTpShouldReuery(true))
      .catch(err=>console.log('insert error',err));
  };

  const isValidHandler = (errCount) => {
    errCount > 0 ? setIsFormValid(false) : setIsFormValid(true);
  };

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const addItemModal = (rdId) => {
    const initItem = {
      Id: 0,
      rdId: rdId,
      qtt: 0,
      len: 0,
      resultType: 0,
      timeOne: 0,
    };

    return (
      <MyModal
        modalHeader={"Editing item"}
        modalBody={
          <RdsrTpEditForm
            tpItem={initItem}
            isSubmitted={isSubmitted}
            submitHandler={itemEditHandler}
            checkIsValid={isValidHandler}
            restQtt={rdsrQtts.restQtt}
            prevLen = {0}
            prevQtt={0}
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
            <PlusSquare />
          </div>
        }
      />
    );
  };

  const showItems = (items) => {
    

    return (
      <div>
        <ul className="list-group mt-1">
          {items.map((tpItem, i) => {
            return (
              <RdsrTpItem
                tpItem={tpItem}
                key={tpItem.Id}
                statusId={statusId}
                restQtt={rdsrQtts.restQtt}
                deleteHandler={deleteItemHandler}
                editHandler={itemEditHandler }
              />
            );
          })}
          <div className="" style={{display:"inline",float:"right"}}>{statusId == 50 && addItemModal(rdId)}</div>
        </ul>
        
        <p className="card-p  mt-1">
          Исходное количество:<strong> {resQttFact?resQttFact.toFixed(3):0} метров</strong>
        </p>

        <p className="card-p  mt-1">
          Использовано материала: <strong>{rdsrQtts.usedQtt} метров</strong>
        </p>

        <p className="card-p  mt-1">
          Осталось на складе: <strong>{rdsrQtts.restQtt} метров</strong>
        </p>
      </div>
    );
  };

  return (
    <div>
      {isLoading && "Loading..."}
      {Error && <ErrorMessage message={'Список пуст'} style = {'info'} />}

      {rdsrTp && showItems(rdsrTp)}
      {rdsrQtts.restQtt<0 && <ErrorMessage message={'Количество на выходе не должно быть меньше нуля. Проверьте исходное количество и результаты операций'} style = {'danger'} />}
    </div>
  );
};

export default RdsrTpList;
