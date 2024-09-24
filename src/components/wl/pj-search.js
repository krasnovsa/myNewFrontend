import React, { useState, useEffect } from "react";
import { Search } from "react-bootstrap-icons";

import { getPjById } from "../../api/apiWl";
import { isAuthenticated } from "../../auth/index";
import ErrorMessage from "../error-message";
import MyModal from "../modal";
import MyScaner from "../qr/Scaner"

const PjSearch = (props) => {
  const { pjId, handleFoundPj } = props;
  //console.log( 'props ', props)

  const {
    user: { _id = null },
  } = isAuthenticated();
  const { token } = isAuthenticated();
  //console.log("user Id", _id);

  const [foundPj, setFoundPj] = useState({});
  const [isInputChanged, setIsInputChanged] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [Error, setError] = useState(false);

  const init = (pjId) => {
    getPjById(token,_id,  pjId)
      .then((data) => {
        console.log("get data", data);

        if (data.error) {
          setError(data.error);
          setFoundPj({});
          setSearchValue(null);
        } else {
          setFoundPj(data);
          setError(false);
        }
      })
      .catch((err) => {
        setError(err.message);
        setFoundPj({});
        setSearchValue(null);
      });
  };

  useEffect(() => {
    console.log("searching init value value", pjId);
    if (pjId) {
      init(pjId);
      setSearchValue(pjId);
    }
  }, []);

  useEffect(() => {
    console.log("searching value", searchValue);
    init(searchValue);
  }, [searchValue]);

  const handleOnClick = (e) => {
    console.log("start searching pj " + inputValue);
    setSearchValue(inputValue);
    setIsInputChanged(false);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);

    setIsInputChanged(true);
  };

  const onModalOk = () => {
    handleFoundPj(foundPj);
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
        <form className="form-inline  w-100 d-flex">
          <input
            type="number"
            className="form-control col-9 p-1 m-1"
            id="pjId"
            placeholder="введите номер производственного задания"
            value={inputValue}
            onChange={handleChange}
          />

          <button
            className="submit"
            className="btn btn-primary col-2 m-1"
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
             {foundPj.wName}
            </h2>
            <div className="card-body">
              <small></small>
              <p className="card-p  mt-2">ПЗ № {foundPj.pjId}</p>
              <p className="card-p  mt-2">{foundPj.wName}</p>
              <p className="card-p  mt-2">{foundPj.isClosed?"Закрыто":"Открыто"}</p>
            </div>
            
          </div>
        )}
        {(!searchValue || Error )&& <ErrorMessage message={"ПЗ не найдено"} />}
      </div>
    );
  };

  return (
    <MyModal
      modalHeader={"Поиск производственного задания по номеру"}
      modalBody={searchCard()}
      onOk={onModalOk}
      onCancel={onModalCancel}
      buttonCaption={
        <div>
          <Search /> Поиск производственного задания
        </div>
      }
      initModalShow={pjId == 0 ? true : false}
      showOk={foundPj.pjId&&(!foundPj.isClosed)?true:false}
    />
  );
};

export default PjSearch;
