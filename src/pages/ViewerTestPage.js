import React from 'react';
import Layout from '../components/layout'
import Viewer from '../components/att/Viewer'
import { withRouter } from "react-router-dom";
import SliderAtt from '../components/att/sliderAtt/SliderAtt'


function ViewerTestPage(props) {
    const { table, keyValue} = props.match.params;
    return (
        <Layout
      title={
        <div>
           Просмотр вложений
        </div>
      }
      description="Оформление коробок, печать этикеток"
      className="container"
    >
      {/* <div>
        <SliderAtt table={table} keyValue={keyValue}/>
      </div> */}

        <div className="col-12 col-md-4">
          <Viewer
            table={table}
            keyValue={keyValue}
            
          />
        </div>
      
    </Layout>
    );
}

export default withRouter(ViewerTestPage);