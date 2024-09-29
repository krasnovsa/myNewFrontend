import React from 'react';

const OrderListHeader = () => (
  <thead>
    <tr>
      <th className="firmSName" rowSpan="2">Орг.</th>
      <th className="ordId" rowSpan="2">ID заказа</th>
      <th className="dateCreated">Дата создания</th>
      <th className="custSName" rowSpan="2">Заказчик</th>
      <th className="descrNoHtml" rowSpan="2">Примечания</th>
      <th className="hrsPlan">План,ч</th>
      <th className="shHrs">Отгр,ч</th>
      <th className="nzpHrs" rowSpan="2">НЗП,ч</th>
      <th className="persShipped">Отгр,%</th>
      <th className="rang" rowSpan="2">Ранг</th>
    </tr>
    <tr>
      <th className="invNom">Счет</th>
      <th className="hrsByTech">Техн,ч</th>
      <th className="hrsProdused">Пр,ч.</th>
      <th className="ordProdProgress">Пр,%</th>
    </tr>
  </thead>
);

export default OrderListHeader;