import React, { useState, useEffect } from "react";
import {  useHistory } from "react-router-dom";
import { Search } from 'react-bootstrap-icons';



const SearchForm = (props) => {
  
  const { initUrl, setError, setIsLoading, extFilterStr} = props;
  const [filter, setFilter] = useState("");
  const [success, setSuccess] = useState(false);
  // const [newUrl, setNewUrl] = useState("");
  const history = useHistory()

  const handleChange = (e) => {
    // setSuccess(false);
    setFilter(e.target.value);
    // setNewUrl(`${initUrl}/${filter}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(false)
    setIsLoading(true)
    history.push(`${initUrl}/${filter}`);
  };
  const handleReset = (e) => {
    e.preventDefault();
    setFilter('');
    setError(false)
    setIsLoading(true)
    history.push(`${initUrl}`);
  };

  

  useEffect(()=>{
   if (extFilterStr){
    return setFilter(extFilterStr)
   }
    return
  },[extFilterStr])


  return (
    <div className="d-flex w-100 justify-content-between">
             
          <input
            type="text"
            className="form-control mb-2 mr-2"
            id = "filterField"
            placeholder="введите часть названия"
            onChange={handleChange}
            value={filter}
          />
        <button className="btn btn-outline-primary mb-2 mr-2" onClick={handleSubmit}>
         <Search />
        </button>
        <button className="btn btn-outline-danger mb-2 " onClick={handleReset}>
         X
        </button>
      
    </div>
  );
};

export default SearchForm;
