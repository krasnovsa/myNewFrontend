import React from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

import Layout from "../layout";
import {UpcScan} from 'react-bootstrap-icons'

const QrResponsePage = (props) => {
 const params = props.match.params
 const search = props.location.search

    return (
        <Layout
        title={
          <div className='ml-2'>
            <UpcScan /> Результат сканирования
          </div>
        }
        description="Выбор возможных действий"
        className="container"
      >
        <div className="row">
            <div>{JSON.stringify(params)}</div>
            <div>{JSON.stringify(queryString.parse(search))}</div>          
        </div>
      </Layout>
    );
};

export default withRouter(QrResponsePage);