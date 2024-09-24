import React from "react";
import { withRouter } from "react-router-dom";

import GTInfo from "../components/gt/gt-info.js";
import Layout from "../components/layout";
import GTList from "../components/gt/gt-list";
import { Basket2 } from "react-bootstrap-icons";

const GetTools = (props) => {
  const { pageSize, pageNumber, textFilter = " ", parAccId } = props.match.params;
  console.log("text filter in Boxes props.match.params", textFilter);
  const style = {
    height: "500px",
    overflow: "auto",
  };

  return (
    <Layout
      title={
        <div>
          {"  "} <Basket2 /> Выдача инструмента {" "}
        </div>
      }
      description="Выдача инструмента, открытие шкафов"
      className="container"
    >
      <div className="row">
        <div className="col-12 col-md-8 mb-2">
          <GTInfo />
        </div>
        <div className="col-12 col-md-4">
          <GTList
            style={style}
            pageNumber={pageNumber}
            pageSize={pageSize}
            textFilter={textFilter}
            parAccId = {parAccId}
          />
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(GetTools);
