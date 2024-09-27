import React from "react";
import { useNavigate } from "react-router-dom";
import moment from 'moment';

//import SliderAtt from '../att/sliderAtt/SliderAtt'

function OiProdInfo(props) {
  const {
    prodName,
    oiQtt,
    color,
    matMap,
    matSpec,
    oiQttShipped,
    oiHrsProdused,
    oiHrsSum,
    oiId,
    prodId,
    pjLastDatePr,
    oiSName,
  } = props.oi;

  const style = {
    backgroundColor: `#${color.toString(16)}`,
    borderRadius: "5px",
  };

  const navigate = useNavigate();

  const openDrawingHandler = () => {
    navigate(
      `${process.env.PUBLIC_URL}/att/Продукция/${prodId}`
    );
  };

  const openWlByProdHandler = () => {
    navigate(
      `${process.env.PUBLIC_URL}/wl/byParams/pageNumber/1?prodId=${prodId}&emplId=0`
    );
  };

  const openWlByOiHandler = () => {
    navigate(
      `${process.env.PUBLIC_URL}/wl/byParams/pageNumber/1?oiId=${oiId}&emplId=0`
    );
  };

  return (
    <div className="card p-2">
      <h3 className="card-title">{oiSName}</h3>
      <div className="card-body p-1">
        <div className="">
          <button className="btn btn-primary m-1" onClick={openDrawingHandler}>
            Чертеж
          </button>
          <button className="btn btn-primary m-1" onClick={openWlByOiHandler}>
            ЖР СОЗ № {oiId}
          </button>
          <button className="btn btn-primary m-1" onClick={openWlByProdHandler}>
            ЖР Прод № {prodId}
          </button>
        </div>
        <small>материал</small>
        <div>{matSpec}</div>
        <small>снабжение</small>
        <div>{matMap || "не заказано"}</div>
        <small>количество</small>
        <div>{oiQtt}</div>
        <small>отгружено</small>
        <div>{oiQttShipped}</div>
        <small>часов фактически</small>
        <div>{oiHrsProdused}</div>
        <small>часов план</small>
        <div>{oiHrsSum}</div>
        <small>дата завершения произвоства</small>
        <div>{pjLastDatePr ? moment(pjLastDatePr).format('DD.MM.YYYY') : "нет данных"}</div>
      </div>
      <div className='card-img-bottom'>
        {/* {prodId&&<SliderAtt table='Продукция' keyValue={prodId}/>} */}
      </div>
    </div>
  );
}

export default OiProdInfo;