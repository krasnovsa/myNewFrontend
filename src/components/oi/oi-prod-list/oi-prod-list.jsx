import React, { useState, useEffect, useContext } from "react";
import { CurrentAppContext } from "../../../contexts/currentApp";
import { ThreeDots } from "react-loader-spinner";
import OiProdListItem from "../oi-prod-list-Item/oi-prod-list-item";
import { isAuthenticated } from "../../../auth";
import { getProdInfoById } from "../../../api/apiOrder";
import { reduceOiProd } from "../reduceOiProd";
import "./styles.css"; // Импортируем CSS файл

function OiProdList(props) {
  const {
    user: { _id = null },
  } = isAuthenticated();
  const { token } = isAuthenticated();

  const [state, dispatch] = useContext(CurrentAppContext);
  const { ordId, custSName } = state.curOrder;
  const extAllPj = state?.extAllPj || false;

  const [oiList, setOiList] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [requeryTrigger, setRequeryTrigger] = useState(false);

  useEffect(() => {
    const fetchProdInfo = async () => {
      setIsLoading(true);
      try {
        const list = await getProdInfoById(token, _id, ordId);
        if (list?.length !== 0 && !list.error) {
          const newOiList = reduceOiProd(list);
          console.log("newList ", newOiList, Object.keys(newOiList));
          setOiList(newOiList);
          setError(false);

          // Устанавливаем первый элемент как активный
          const firstOi = Object.values(newOiList)[0];
          if (firstOi) {
            dispatch({ type: "SET_CURRENT_OIPROD", payload: firstOi.info });
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProdInfo();
  }, [token, _id, ordId, requeryTrigger]);

  const onExtAllClick = () => {
    dispatch({ type: "SET_EXT_ALL_PJ", payload: !extAllPj });
  };

  return (
    <div className="oi-prod-list-container">
      {error && <div className="alert alert-danger">.{error}</div>}
      {isLoading && (
        <div className="loader-container">
          <ThreeDots color="#0d6efd" height={80} width={80} />
        </div>
      )}

      <div className="oi-prod-list-content">
        <div className="oi-prod-list-header">
          <h3>Заказ № {ordId}</h3>
          <h4>{custSName}</h4>
          <button
            className="m-auto btn btn-sm btn-primary"
            onClick={onExtAllClick}
          >
            {extAllPj ? "Свернуть" : "Развернуть"}
          </button>
        </div>
        <ul className="list-group mt-2">
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
