import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { isAuthenticated } from "../../auth";
import RdsrTicketList from "../../components/rdsr/rdsr-ticket-list";
import { printTickets } from "../../api/apiRdsrTp";

import { Spinner } from "react-bootstrap";

const RdsrPrint = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    token,
    user: { _id = null },
  } = isAuthenticated();

  const { rdId } = props.match.params;

  const printHandler = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    if (isLoading == false) {
      return;
    }
    printTickets(token, _id, rdId).then(() => {
      setIsLoading(false);
    });
  }, [isLoading, token, rdId]);

  return (
    <div className="">
      <button className="btn btn-primary" onClick={printHandler}>
        Печать
      </button>
       <Spinner animation="border" variant="info" />
       <RdsrTicketList rdId={rdId} />
  
    </div>
  );
};

export default withRouter(RdsrPrint);
