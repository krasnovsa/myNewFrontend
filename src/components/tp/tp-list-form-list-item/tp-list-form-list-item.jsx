import React from 'react';
import './styles.css'; // Импортируем CSS-файл

const TpListFormListItem = ({ tpItem }) => {
  return (
    <li className="list-group-item">
      <div className="num">{tpItem.num}</div>
      <div className="wgId">{tpItem.wGroupId}</div>
      <div className="qttToOne">{tpItem.qttToOne}</div>
      <div className="qttPlan">{tpItem.qttPlan}</div>
      <div className="descr descr-text">{tpItem.descr}</div>
    </li>
  );
};

export default TpListFormListItem;