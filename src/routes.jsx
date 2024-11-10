import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./auth/PrivateRoute";
import TpPage from "./pages/tp-page/tp-page";
import MainPage from "./pages/main-page/main-page";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute element={Dashboard} />} />
      <Route
        path="/main-page/:srchStr?"
        element={<PrivateRoute element={MainPage} />}
      />
      <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
      <Route
        path="/tp-page/:prodId"
        element={<PrivateRoute element={TpPage} />}
      />
    </Routes>
  );
};

export default AppRoutes;
