import React, { useState } from 'react';
import TpListFormListItem from '../tp-list-form-list-item/tp-list-form-list-item';


const TpListFormList = ({ techProcess }) => {
  const [isCollapsed, setIsCollapsed] = useState(!techProcess.tpIsDefault);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div>
      <h3>Техпроцесс ID: {techProcess.tpId}</h3>
      <p>Автор: {techProcess.tpAuthorId}</p>
      <p>Дата создания: {techProcess.tpCrDate}</p>
      <p>По умолчанию: {techProcess.tpIsDefault ? 'Да' : 'Нет'}</p>
      <h4 onClick={toggleCollapse} style={{ cursor: 'pointer' }}>
        {isCollapsed ? 'Развернуть' : 'Свернуть'} список элементов
      </h4>
      {!isCollapsed && (
        <div>
          <div className="list-group-item">
            <div className="header num">Номер</div>
            <div className="header wgId">Группа работ</div>
            <div className="header qttToOne">Количество на единицу</div>
            <div className="header qttPlan">Плановое количество</div>
            <div className="header descr">Описание</div>
          </div>
          <ul>
            {techProcess.tpItems.map((item) => (
              <TpListFormListItem tpItem={item} key={item.Id} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TpListFormList;