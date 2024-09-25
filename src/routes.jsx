import { Routes, Route } from "react-router-dom";

import PrivateRoute from './auth/PrivateRoute'

// import Boxes from "./pages/boxes";
// import Rdsr from "./pages/rdsr";
// import GetTools from "./pages/get-tools";
// import RdsrPrint from "./pages/rdsr-print/rdsr-print";
// import WlByEmplPage from "./components/wl/WlByEmplPage";
// import WlByParams from "./components/wl/WlByParams";
import Orders from "./pages/orders";
// import Oi from "./pages/oi";

// import BoxAddUpdate from "./pages/box-add-update";
// import WlAddUpdate from "./components/wl/wl-add-update";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
// import ViewerTestPage from './pages/ViewerTestPage';
// import QrResponsePage from './components/qr/QrResponsePage'

// import {isAuthenticated} from './auth/index'



const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute element={Dashboard} />} />
      <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
      <Route path="/orders/:loadMode/:filterStr?"  element={<PrivateRoute element={Orders}/>} />
      {/* <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
      <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
      <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} /> */}

      {/* <PrivateRoute path="/boxes/pageNumber/:pageNumber/pageSize/:pageSize/textFilter/:textFilter"  component={Boxes} />
      
      <PrivateRoute path="/boxes/pageNumber/:pageNumber/pageSize/:pageSize/textFilter"  component={Boxes} />
      <PrivateRoute path="/box/addnew" > <BoxAddUpdate loadMode={0}/></PrivateRoute>
      <PrivateRoute path="/box/update" > <BoxAddUpdate loadMode={1}/></PrivateRoute>
      
      <PrivateRoute path="/rdsr/pageNumber/:pageNumber/pageSize/:pageSize/textFilter/:textFilter"  component={Rdsr} />
      <PrivateRoute path="/rdsr/pageNumber/:pageNumber/pageSize/:pageSize/textFilter"  component={Rdsr} />
      <PrivateRoute path="/rdsr-print/:rdId"  component={RdsrPrint} />

      <PrivateRoute path="/gt/pageNumber/:pageNumber/pageSize/:pageSize/parAccId/:parAccId/textFilter/:textFilter"  component={GetTools} />
      <PrivateRoute path="/gt/pageNumber/:pageNumber/pageSize/:pageSize/parAccId/:parAccId/textFilter"  component={GetTools} />
      
      <PrivateRoute path="/wl/byEmpl/pageNumber/:pageNumber"><WlByEmplPage /> </PrivateRoute>
      <PrivateRoute path="/wl/byParams/pageNumber/:pageNumber"><WlByParams /> </PrivateRoute>
      <PrivateRoute path="/wl/addnew" > <WlAddUpdate loadMode={0}/></PrivateRoute>
      <PrivateRoute path="/wl/update" > <WlAddUpdate loadMode={1}/></PrivateRoute>
      
      <PrivateRoute path="/att/:table/:keyValue" ><ViewerTestPage /></PrivateRoute> */}
      
    
      {/* <PrivateRoute path="/orders/:loadMode/:filterStr" ><Orders /></PrivateRoute>
      <PrivateRoute path="/orders/:loadMode/" ><Orders /></PrivateRoute>
      
      <PrivateRoute path="/order/prod/:ordId/" ><Oi /></PrivateRoute> */}
     
      {/* <PrivateRoute path="/qr/:theme" ><QrResponsePage /></PrivateRoute> */}


    </Routes>
  )
}

export default AppRoutes