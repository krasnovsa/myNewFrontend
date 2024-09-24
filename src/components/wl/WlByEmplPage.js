import React from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

import WlList from "./wl-list";
import WlInfo from "./wl-info";

import {isAuthenticated} from '../../auth/index'


import Layout from "../layout";
import { JournalText } from "react-bootstrap-icons";

const WlByEmplPage = (props) => {

  const { pageNumber } = props.match.params;
  const search = props.location.search;

  const {
  user: { _id = null },
} = isAuthenticated();

  const emplId =_id
  const style = {
    height: "500px",
    overflow: "auto",
  };

  const options = {
    ...queryString.parse(search),
    pageNumber,
    emplId,
    paginURL_1:`${process.env.PUBLIC_URL}/wl/byEmpl/pageNumber/1`,
    paginURL:`${process.env.PUBLIC_URL}/wl/byEmpl/pageNumber/*`
  };

  return (
    <Layout
      title={
        <div className='ml-2'>
          <JournalText /> Журнал работ{" "}
        </div>
      }
      description="Отчет по сотруднику"
      className="container"
    >
      <div className="row">
        <div className="col-12 col-md-6 mb-2">
          <WlInfo />
        </div>
        <div className="col-12 col-md-6">
          <WlList
            options={options}
          />
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(WlByEmplPage);