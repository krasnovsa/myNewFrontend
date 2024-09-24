import React, { useState, useEffect } from "react";
import { Search } from "react-bootstrap-icons";

import { getExProps } from "../api/apiOi";
import { isAuthenticated } from "../auth/index";
import ErrorMessage from "./error-message";
import MyModal from "./modal";
//import MyScaner from "./scaner"

const OiSearch = (props) => {
  const { oiId, handleFoundOi } = props;
  //console.log( 'props ', props)

  const {
    user: { _id = null },
  } = isAuthenticated();
  const { token } = isAuthenticated();
  //console.log("user Id", _id);

  const [foundOi, setFoundOi] = useState({});
  const [isInputChanged, setIsInputChanged] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [Error, setError] = useState(false);

  const init = (oiId) => {
    getExProps(_id, token, oiId)
      .then((data) => {
        //console.log("get data", data);

        if (data.error) {
          setError(data.error);
          setFoundOi({});
          setSearchValue(null);
        } else {
          setFoundOi(data);
          setError(false);
        }
      })
      .catch((err) => {
        setError(err.message);
        setFoundOi({});
        setSearchValue(null);
      });
  };

  useEffect(() => {
    console.log("searching init value value", oiId);
    if (oiId) {
      init(oiId);
      setSearchValue(oiId);
    }
  }, []);

  useEffect(() => {
    console.log("searching value", searchValue);
    init(searchValue);
  }, [searchValue]);

  const handleOnClick = (e) => {
    //console.log("start searching oi " + inputValue);
    setSearchValue(inputValue);
    setIsInputChanged(false);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);

    setIsInputChanged(true);
  };

  const onModalOk = () => {
    handleFoundOi(foundOi);
    setSearchValue(null);
    setInputValue(null)
    setIsInputChanged(false);
    setError(false)
    
  };

  const onModalCancel = () => {
    setSearchValue(null);
    setInputValue(null)
    setIsInputChanged(false);
    setError(false)
  };

  const searchCard = () => {
    return (
      <div>
        <form className="form-inline d-flex w-100 justify-content-between">
          <input
            type="number"
            className="form-control mt-1 mb-2"
            id="oiId"
            placeholder="put number of production"
            value={inputValue}
            onChange={handleChange}
          />

          <button
            className="submit"
            className="btn btn-primary mt-1 mb-2"
            onClick={handleOnClick}
            disabled={!isInputChanged}
          >
            <Search /> Find
          </button>
          
        </form>

        {/* <MyScaner /> */}

        {searchValue && (
          <div className="card ">
            <h2 className="card-header card-header-1 ">
              Продукция в заказе {foundOi.prodName}
            </h2>
            <div className="card-body">
              <small>Номер продукции</small>
              <p className="card-p  mt-2">{foundOi.Id}</p>
              <small>Номер заказа</small>
              <p className="card-p  mt-2">{foundOi.orderId}</p>
              <small>Поставщик</small>
              <p className="card-p  mt-2">{foundOi.fName}</p>
              <small>Продавец</small>
              <p className="card-p  mt-2">{foundOi.cName}</p>
            </div>
            
          </div>
        )}
        {(!searchValue || Error )&& <ErrorMessage message={Error} />}
      </div>
    );
  };

  return (
    <MyModal
    // showOk={}
      modalHeader={"Try find production by number"}
      modalBody={searchCard()}
      onOk={onModalOk}
      onCancel={onModalCancel}
      buttonCaption={
        <div>
          <Search /> find product
        </div>
      }
      initModalShow={oiId == 0 ? true : false}
    />
  );
};

export default OiSearch;
