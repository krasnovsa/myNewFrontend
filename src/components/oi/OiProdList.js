import React, { useState, useEffect, useContext } from "react";
import { CurrentAppContext } from "../../contexts/currentApp";

import Loader from "react-loader-spinner";

import OiProdListItem from "./OiProdListItem";

import { isAuthenticated } from "../../auth";
import { getProdInfoById } from "../../api/apiOrder";
import { reduceOiProd } from "./reduceOiProd";

function OiProdList(props) {
  //const{ ordId, custSName } = props

  const {
    user: { _id = null },
  } = isAuthenticated();
  const { token } = isAuthenticated();

  const [state, dispatch] = useContext(CurrentAppContext);
  const {ordId, custSName}= state.curOrder

  const extAllPj=state?.extAllPj||false;

  const [oiList, setOiList] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [requeryTrigger, setRequeryTrigger] = useState(false);

  const style = {
    height: "80vh",
    overflow: "auto",
  };

  useEffect(() => {
    setIsLoading(true);
    getProdInfoById(token, _id, ordId)
      .then((list) => {
        if (list?.length !== 0 && !list.error) {
          const newOiList = reduceOiProd(list);
          console.log("newList ", newOiList, Object.keys(newOiList));
          setOiList(newOiList);
          setError(false);
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(setIsLoading(false));
  }, [, ordId, requeryTrigger]);

  const onExtAllClick=()=>{
    dispatch({ type: "SET_EXT_ALL_PJ", payload: !extAllPj })
  }

  return (
    <div>
      {error && <div className="alert alert-danger">.{error}</div>}
      {isLoading && (
        <Loader
          type="Puff"
          color="#007bff"
          height={70}
          width={70}
          timeout={5000} //3 secs
        />
      )}
      <div className=''>
        <h1>Заказ № {ordId}</h1>
        <h2>{custSName}</h2>
        <button className="m-auto btn btn-sm btn-primary " onClick={onExtAllClick}>{extAllPj?'Свернуть':'Развернуть'}</button>
      </div>
      <div style={style}>
        <ul className="list-group mt-2 ">
          {Object.keys(oiList).length !== 0 &&
            Object.keys(oiList).map((key) => {
              return <OiProdListItem key={key} oi={oiList[key]} />;
            })}
        </ul>
      </div>
    </div>
  );
}

export default OiProdList;
