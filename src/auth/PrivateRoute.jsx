const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        element={
            isAuthenticated() ? (
                <Component />
            ) : (
                <Navigate
                    to={{
                        pathname: "/login",
                        state: { from: rest.location }
                    }}
                />
            )
        }
    />
);