import React from "react";
import { SERVER } from "../../config";

const RdsrTicketItem = ({ tpItem, more }) => {
  const { Id, rdId, qtt, len, timeOne, oiSName, resName } = tpItem;

  // const typeName = ["основная заготовка", "вторичная заготовка", "отходы"];
  // const typeStyle = ["primary", "secondary", "warning"];

  return (
    <div className={` ${more===true?'more':''}`}>
      <img
        src={`${SERVER}/qr-code/150?Id=${Id}&rdId=${rdId}&qtt=${qtt}&len=${len}`}
      ></img>
      <div>
        <h5 className="mb-1   ml-2">
          Номер этикетки : {Id}. К документу {rdId}
        </h5>
        <h5 className="mb-1 ml-2 ">Продукция : {oiSName}</h5>
        <h5 className="mb-1  ml-2 ">Материал : {resName}</h5>
        <h5 className="mb-1  ml-2 ">
          {len} мм x {qtt} шт = {(len * qtt) / 1000} метров.
        </h5>
        <h5 className="mb-1  ml-2 ">Тшт = {timeOne ? timeOne : 0} сек/шт</h5>
      </div>
    </div>
  );
};

export default RdsrTicketItem;
