import React from "react";

import PjListItem from './PjListItem'
import "./pjList.css";

function PjList(props) {
  const { pjList, oi } = props;



  return (
    <ul className="pj-list list-group list-group-flush">
      {pjList.map((pj) => {
        return (
            <div className='pj-item' key={pj.pjId}><PjListItem pj={pj} oi={oi}/></div>
        );
      })}
    </ul>
  );
}



export default PjList;
