import React, { useState, useEffect, useContext } from "react";


import Layout from "../components/layout";
import OiSearch from "../components/oi-search";
//import MyScaner from "../components/scaner"
import { isAuthenticated } from "../auth";
import { withRouter, useHistory } from "react-router-dom";
import { update, addnew } from "../api/apiBox";

import { CurrentAppContext } from "../contexts/currentApp";



const BoxAddUpdate = (props) => {
  //loadMode 1 update , 0 - addNew
  const [state, dispatch] = useContext(CurrentAppContext);

  const {
    user: { _id = null },
  } = isAuthenticated();
  const { token } = isAuthenticated();

  const { loadMode } = props;
  const history = useHistory();

  const [Error, setError] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [box, setBox] = useState({});
  const [initOiId, setInitOiId] = useState(0);

  const init = () => {
    if (loadMode == 1) {
      const { currentBox } = state;
      console.log("current box", currentBox);
      setBox({ ...box, ...currentBox });
      setInitOiId(currentBox.oiId);
    } else {
      const currentBox = {
        qtt: null,
        boxedBy: _id,
        mass: null,
        oiId: null,
        prodName: "",
      };
      setBox({ ...box, ...currentBox });
      setInitOiId(currentBox.oiId);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (e) => {
    setBox({ ...box, [name]: e.target.value });
    setError(false);
    setIsUpdated(false);
  };

  const clickSubmit = (method) => (e) => {
    e.preventDefault();

    method(token, _id, box)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          setError(data.error);
        } else {
          console.log("update success");
          setIsUpdated(true);
          setError(false);
        }
      })
      .catch((err) => {
        console.log("update error");
        setError(err);
      });
  };

  const redirectUser = (isUpdated) => {
    if (isUpdated) {
      setIsUpdated(false);
      console.log("history ", history);
      return history.push("/boxes/pageNumber/1/pageSize/30/textFilter/");
    }
  };

  const handleFoundOi = ({ Id, fName, cName, prodName }) => {
    console.log("we got new oiId ", Id);

    setBox({
      ...box,
      oiId: Id,
      fName: fName,
      cName: cName,
      prodName: prodName,
    });
  };

  const boxUpdate = ({ qtt, mass, oiId, fName, cName, prodName }) => (
    <form>
      <div className="card ">
        <h2 className="card-header card-header-1 ">
          {`Продукция в заказе ${prodName}`}
        </h2>
        <div className="card-body">
          <small>Номер продукции</small>
          <p className="card-p  mt-2">{oiId}</p>
          <small>Поставщик</small>
          <p className="card-p  mt-2">{fName}</p>
          <small>Продавец</small>
          <p className="card-p  mt-2">{cName}</p>
        </div>
      </div>

      <div className="form-group">
        <label className="text-muted">qtt</label>
        <input
          type="number"
          onChange={handleChange("qtt")}
          className="form-control"
          value={qtt}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">mass</label>
        <input
          type="number"
          onChange={handleChange("mass")}
          className="form-control"
          value={mass}
        />
      </div>

      <button
        onClick={clickSubmit(loadMode ? update : addnew)}
        className="btn btn-outline-primary"
      >
        Закрыть
      </button>
    </form>
  );

  return (
    <Layout
      title={`Box ${loadMode ? "update" : "addnew"}`}
      description={`${loadMode ? "Update" : "add new"} your box here...`}
      className="container-fluid"
    >
      {(!loadMode || initOiId) && (
        <OiSearch oiId={initOiId} handleFoundOi={handleFoundOi} />
      )}

      {/* <MyScaner /> */}

      {(box.oiId>0) && boxUpdate(box)}

      {redirectUser(isUpdated)}
      {Error && "Error " + Error.message}
    </Layout>
  );
};

export default withRouter(BoxAddUpdate);
