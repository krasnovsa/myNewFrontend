import React from "react";
import { withRouter } from "react-router-dom";
import { Lightning} from "react-bootstrap-icons";

import RDSRList from "../components/rdsr/rdsr-list.js";
import RDSRInfo from "../components/rdsr/rdsr-info.js";
import Layout from "../components/layout.jsx";


const Rdsr= (props) => {
  const { pageSize, pageNumber, textFilter = "" } = props.match.params;
  console.log(pageSize, pageNumber, textFilter)
  const style = {
    height : "650px",
    overflow: "auto",
  };

  return (
    <Layout
      title={
        <div className="pl2" >
          <Lightning /> Журнал пильного участка {" "}
        </div>
      }
      description="создание отчетов"
      className="container"
    >
      <div className="row">
        <div className="col-12 col-md-8 mb-2">
          <RDSRInfo />
        </div>
        <div className="col-12 col-md-4">
          <RDSRList
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

export default withRouter(Rdsr);
