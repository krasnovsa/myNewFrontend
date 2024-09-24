import React, { useState, useEffect, useContext, props } from "react";
import moment from "moment";
import { reduceWl } from "./utils/reduceWl";
import WlItem from "./wl-item";

const WlListSalary = (props) => {
  const wlList = props;
  const rList = reduceWl(wlList);
  //console.log('rList', rList)
  const showItems = (items) => {
    return (
      <ul className="list-group">
        {items.map((wlItem) => {
          return <WlItem wl={wlItem} key={wlItem.wlId} />;
        })}
      </ul>
    );
  };

  const ShowGroups = (grItems) => {
    return Object.keys(grItems).map((key,i) => (
      <div key={i}>
        <div className="d-flex w-100 justify-content-center mt-3 mb-1">
          <span className="badge badge-pill badge-secondary">
            {moment(grItems[key].info.wDate).format("DD.MM.YYYY")} {" см."}
            {grItems[key].info.wShift} сум: {grItems[key].info.wSum.toFixed(2)}
            {" руб "}
            {grItems[key].info.eFio}
          </span>
        </div>
        {showItems(grItems[key]["reports"])}
      </div>
    ));
  };

  return <div>{ShowGroups(rList)}</div>;
};

export default WlListSalary;
