
import React from "react";
import { withRouter } from "react-router-dom";

import OiProdList from "../components/oi/OiProdList";
import Layout from "../components/layout";
import { ArrowBarUp } from "react-bootstrap-icons";

const OiProd = (props) => {

 // const { ordId=0,  } = props.match.params;
 

  return (
    <Layout
      title={
        <div>
          {"  "} <ArrowBarUp /> Заказ. Производство
        </div>
      }
      description="Информация о заказах"
      className="container"
    >
      <div className="row">
        <div className="col-12 col-md-6">
          <OiProdList
            //ordId={ordId}
          />
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(OiProd);