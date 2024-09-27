import React from "react";

import PjListItem from './PjListItem'
import "./pjList.css";

function PjList(props) {
  const { pjList } = props;



  return (
    <ul className="pj-list list-group list-group-flush">
      {pjList.map((pj) => {
        return (
            <div className='pj-item' key={pj.pjId}><PjListItem pj={pj}/></div>
        );
      })}
    </ul>
  );
}



export default PjList;
// {
//   "oiId": 36442,
//   "ordId": 59411881,
//   "custSName": "Точная механика_2",
//   "oiSName": "36442 Основание 32-МСК.00-01.281",
//   "prodName": "Основание 32-МСК.00-01.281",
//   "oiQtt": 26,
//   "price": 3450,
//   "isService": false,
//   "isOrdClose": false,
//   "isOrdOpen": true,
//   "color": 10053120,
//   "matQttToBuy": 6.448,
//   "matName": "СТАЛЬ 20 Плита 22  х 125",
//   "matMap": null,
//   "matQttInBuings": 0,
//   "matQttSupplied": 0,
//   "matSpec": "СТАЛЬ 20 Плита 22  х 125 6.448 м./ 140.083 кг.",
//   "oiQttShipped": 0,
//   "pjId": 195984,
//   "tpItId": 15084,
//   "tpId": 2066,
//   "num": 10,
//   "pjQtt": 26,
//   "pjQttProdused": 36,
//   "pjHrsProdused": 1.35,
//   "pjStartDatePr": "2021-04-01T00:00:00.000Z",
//   "pjLastDatePr": "2021-04-03T00:00:00.000Z",
//   "pjLastBToolId": 27,
//   "pjStartDateManual": null,
//   "wtId": 9,
//   "wgId": 3,
//   "tOneHrs": 0.06944,
//   "btId": 26,
//   "isCNC": 1,
//   "isPjClosed": true,
//   "isOpCanceled": false,
//   "oiDateToShip": "2021-03-24T15:07:00.000Z",
//   "pjQttPlan": 0,
//   "pjHrsPlan": 0,
//   "pjFinDateManual": null,
//   "isMaxNum": 0,
//   "isMinNum": 1,
//   "opName": "10 VC",
//   "planId": null,
//   "plBtId": null,
//   "plQtt": null,
//   "plTOneHrs": null,
//   "plHrs": null,
//   "plStartDate": null,
//   "plFinDate": null,
//   "plQttProdused": 0,
//   "plHrsProdused": 0,
//   "plProdStartDate": null,
//   "plProdFinDate": null,
//   "pjBtName": "VC85",
//   "pjLastBtName": "VC102",
//   "plBtName": null,
//   "wgName": "VC",
//   "wtName": "Фрезерная",
//   "plStartDateStr": null,
//   "pjQttProdusedAfter": 36,
//   "pjHrsProdusedAfter": 1.35,
//   "plProgress": 0,
//   "pjStartDateProdAfter": "2021-04-03T00:00:00.000Z",
//   "oiShipProgress": 0,
//   "pjTOneSec": 250,
//   "pjHrs": 2,
//   "opDescr": "",
//   "isAgreed": false,
//   "qttAgreed": 60,
//   "f6": 0,
//   "f7": 0,
//   "oiSumShipped": 0,
//   "ordSumShipped": 1491600,
//   "ordQttShipped": 504,
//   "ordHrsProdused": 281.33,
//   "oiHrsProdused": 68.62,
//   "oiQttProdused": 196,
//   "ordHrsSum": 329,
//   "oiHrsSum": 80,
//   "oiFinDate": "2021-05-13T04:00:00.000Z",
//   "ordFinDate": "2021-05-14T04:00:00.000Z",
//   "numStr": "10.1",
//   "oiHrsProdusedTheory": 19,
//   "f10": 0,
//   "oiPercHrs": 86,
//   "oiPercHrsTheory": 24,
//   "f13": 0,
//   "f14": 0,
//   "f15": 0,
//   "f16": 0,
//   "oi": 36442
// }