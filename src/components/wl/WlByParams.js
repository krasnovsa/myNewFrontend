import React from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

import WlList from "./wl-list";
import WlInfo from "./wl-info";

import Layout from "../layout";
import { JournalText } from "react-bootstrap-icons";

const WlByParams = (props) => {
  
  const { pageNumber } = props.match.params;
  const search = props.location.search;

  const options = {
    ...queryString.parse(search),
    pageNumber,
    paginURL_1:`${process.env.PUBLIC_URL}/wl/byParam/pageNumber/1?${search}`,
    paginURL:`${process.env.PUBLIC_URL}/wl/byParam/pageNumber/*?${search}`
  };

  console.log("props", props);
  console.log("options", options);

  const style = {
    height: "500px",
    overflow: "auto",
  };

  return (
    <Layout
      title={
        <div>
          {"  "} <JournalText /> Журнал работ{" "}
        </div>
      }
      description="отчет"
      className="container"
    >
      <div className="row">
        {/* <div className="col-12 col-md-6 mb-2">
          <WlInfo />
        </div> */}
        <div className="col-12 col-md-6">
          <WlList options={options} />
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(WlByParams);
