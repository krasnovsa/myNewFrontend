import React, { useState, useEffect, useContext } from "react";
import { PlusSquare } from "react-bootstrap-icons";

import RdsrTicketItem from "./rdsr-ticket-item";
import {getTickets} from "../../api/apiRdsrTp"
import { isAuthenticated } from "../../auth/index";
 
const RdsrTicketList = ({rdId}) => {
 
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [tickets, setTickets] = useState([]);
console.log('tickets', tickets)
const { token, 
    user: { _id = null },
  } = isAuthenticated();

  useEffect(() => {
    setIsLoading(true);

    getTickets(token, _id, rdId)
      .then((data) => {
        setIsLoading(false);
        if (data.error) {
          setIsError(data.error);
          setTickets([]) 
          }
         else {setTickets(data.recordset)}
         
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(err.message);
        setTickets([]) ;
      });
  }, [_id, token, rdId]);


  const showItems = (items) => {
    
    return (
      <div>
        <div className=" mt-1">
          {items.map((tpItem, i, arr) => {
            return (
              <RdsrTicketItem
                tpItem={tpItem}
                key={ i}
                more={i==arr.length?false:true}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
       {tickets.length && showItems(tickets)}
    </div>
  );
};

export default RdsrTicketList;
