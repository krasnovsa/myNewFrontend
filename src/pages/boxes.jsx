

import React from "react";
import { withRouter } from "react-router-dom";

import BoxList from "../components/box/box-list.js";
import BoxInfo from "../components/box/box-info.js";
import Layout from "../components/layout.jsx";
import { Box } from "react-bootstrap-icons";

const Boxes = (props) => {
  const { pageSize, pageNumber, textFilter = " " } = props.match.params;
  console.log("text filter in Boxes props.match.params", textFilter);
  const style = {
    height: "500px",
    overflow: "auto",
  };

  return (
    <Layout
      title={
        <div>
          {"  "} <Box /> Отгузки{" "}
        </div>
      }
      description="Оформление коробок, печать этикеток"
      className="container"
    >
      <div className="row">
        <div className="col-12 col-md-8 mb-2">
          <BoxInfo />
        </div>
        <div className="col-12 col-md-4">
          <BoxList
            style={style}
            pageNumber={pageNumber}
            pageSize={pageSize}
            textFilter={textFilter}
          />
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(Boxes);
