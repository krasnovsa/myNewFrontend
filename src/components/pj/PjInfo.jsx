import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function PjInfo(props) {
  const {
    color,
    oiHrsSum,
    oiId,
    prodId,
    pjLastDatePr,
    oiSName,
    opName,
    plStartDate,
    plFinDate,
    plQttProdused,
    plHrsProdused,
    plProdStartDate,
    plProdFinDate,
    pjBtName,
    plBtName,
    opId,
    pjId,
    pjQtt,
    pjHrsProdused
  } = props.pj;

  const style = {
    backgroundColor: `#${color.toString(16)}`,
    borderRadius: "5px",
  };

  const navigate = useNavigate();

  const openDrawingHandler = () => {
    navigate(`${process.env.PUBLIC_URL}/att/Продукция/${prodId}`);
  };

  const openWlByOpHandler = () => {
    navigate(
      `${process.env.PUBLIC_URL}/wl/byParams/pageNumber/1?opId=${opId}&emplId=0`
    );
  };

  const openWlByPjHandler = () => {
    navigate(
      `${process.env.PUBLIC_URL}/wl/byParams/pageNumber/1?pjId=${pjId}&emplId=0`
    );
  };

  return (
    <div className="card" style={style}>
      <h3 className="card-title">
        {pjId} {opName}
      </h3>
      <div className="card-body">
        <div className="">
          <button className="btn btn-sm btn-primary m-1" onClick={openDrawingHandler}>
            Чертеж
          </button>
          <button className="btn btn-sm btn-primary m-1" onClick={openWlByPjHandler}>
            ЖР ПЗ № {pjId}
          </button>
          <button className="btn btn-sm btn-primary m-1" onClick={openWlByOpHandler}>
            ЖР ТО № {opId}
          </button>
        </div>
        <small>количество</small>
        <div>{pjQtt}</div>
        <small>количество выполнено</small>
        <div>{plQttProdused}</div>
        <small>часов фактически</small>
        <div>{pjHrsProdused}</div>
        <small>часов план</small>
        <div>{oiHrsSum}</div>
        <small>дата завершения произвоства</small>
        <div>
          {pjLastDatePr
            ? moment(pjLastDatePr).format("DD.MM.YYYY")
            : "нет данных"}
        </div>
      </div>
    </div>
  );
}

export default PjInfo;