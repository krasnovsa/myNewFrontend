import { Routes, Route } from "react-router-dom";

import PrivateRoute from './auth/PrivateRoute'
import TpPage from "./pages/tp-page/tp-page";
// import Orders from "./pages/orders";
import MainPage from "./pages/main-page/main-page";
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
      <Route path="/main-page" element={<PrivateRoute element={MainPage} />} />
      <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
      <Route 
      path="/tp-page/:prodId"
      element={<PrivateRoute element={TpPage} />}
      />
    </Routes>
  );
};


export default AppRoutes