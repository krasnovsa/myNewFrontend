import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "./index";

const PrivateRoute = ({ element: Component, ...rest }) => {
    const location = useLocation();

    return isAuthenticated() ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/login" state={{ from: location }} />
    );
};

export default PrivateRoute;