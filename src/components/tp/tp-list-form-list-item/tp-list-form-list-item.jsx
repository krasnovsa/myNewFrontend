import React from 'react';


const TpListFormListItem = ({ tpItem }) => {
  return (
    <div className="list-group-item">
      <div className="num">{tpItem.num}</div>
      <div className="wgName">{tpItem.wgName}</div>
      <div className="qttPlan">{tpItem.qttPlan}</div>
      <div className="descr descr-text">{tpItem.descr}</div>
      <div className="qttToOne">{tpItem.qttToOne}</div>
    </div>
  );
};

export default TpListFormListItem;