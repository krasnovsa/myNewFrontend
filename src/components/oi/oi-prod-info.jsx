import React, { useContext, useState } from "react";
import moment from 'moment';
import { CurrentAppContext } from "../../contexts/currentApp"; // Импортируем контекст
import Viewer from '../att/Viewer'; // Импортируем компонент Viewer
import WlList from '../wl/wl-list'; // Импортируем компонент WlList

function OiProdInfo(props) {
  const [state] = useContext(CurrentAppContext); // Получаем состояние из контекста
  const oi = props.oi || state.curOiProd; // Используем oi из props или из контекста

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
  } = oi || {}; // Добавляем проверку на наличие oi

  const [selectedTab, setSelectedTab] = useState('info'); // Состояние для переключения отображения

  const style = {
    backgroundColor: color ? `#${color.toString(16)}` : '#ffffff', // Проверяем наличие color
    borderRadius: "5px",
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="card p-2" style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
      <h3 className="card-title">{oiSName}</h3>
      <div className="card-body p-1">
        <div className="btn-group" role="group" aria-label="Basic example">
          <button type="button" className={`btn btn-primary ${selectedTab === 'info' ? 'active' : ''}`} onClick={() => handleTabChange('info')}>Инфо</button>
          <button type="button" className={`btn btn-primary ${selectedTab === 'drawing' ? 'active' : ''}`} onClick={() => handleTabChange('drawing')}>Чертеж</button>
          <button type="button" className={`btn btn-primary ${selectedTab === 'wlByProd' ? 'active' : ''}`} onClick={() => handleTabChange('wlByProd')}>ЖР по Продукции</button>
          <button type="button" className={`btn btn-primary ${selectedTab === 'wlByOi' ? 'active' : ''}`} onClick={() => handleTabChange('wlByOi')}>ЖР по ПЗ</button>
        </div>
        {selectedTab === 'info' && (
          <>
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
          </>
        )}
        {selectedTab === 'drawing' && <Viewer prodId={prodId} />}
        {selectedTab === 'wlByProd' && <WlList options={{ prodId, emplId:0 }} />}
        {selectedTab === 'wlByOi' && <WlList options={{ oiId, emplId:0 }} />}
      </div>
      <div className='card-img-bottom'>
        {/* {prodId&&<SliderAtt table='Продукция' keyValue={prodId}/>} */}
      </div>
    </div>
  );
}

export default OiProdInfo;