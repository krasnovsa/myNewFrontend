import React from "react";
import { withRouter } from "react-router-dom";

import OiList from "../components/oi/OiProdList.js";
import OrderList from "../components/order/OrderList.js";
import Layout from "../components/layout.jsx";
import { ArrowBarDown } from "react-bootstrap-icons";

const Orders = (props) => {
  const { filterStr = "", loadMode = 0 } = props.match.params;

 

  return (
    <Layout
      title={
        <div>
          {"  "} <ArrowBarDown /> Заказы
        </div>
      }
      description="Информация о заказах"
      className="container"
    >
      <div className="row">
      
        <div className="col-12 col-md-6">
          <OrderList filterStr={filterStr} loadMode={loadMode} />
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(Orders);
