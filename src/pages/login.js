import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../components/layout";
import { login, authenticate, isAuthenticated } from "../auth";

const Login = () => {
  const [values, setValues] = useState({
    wwwUserName: "",
    wwwPass: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { wwwUserName, wwwPass, loading, error, redirectToReferrer } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    login({ wwwUserName, wwwPass })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              redirectToReferrer: true,
            });
          });
        }
      })
      .catch(() => {
        setValues({ ...values, error: 'server data error', loading: false });
      });
  };

  const logInForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("wwwUserName")}
          type="email"
          className="form-control"
          value={wwwUserName}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("wwwPass")}
          type="password"
          className="form-control"
          value={wwwPass}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Login
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to="/dashboard" />;
    }
    if (isAuthenticated()) {
      return <Redirect to="/dashboard" />;
    }
  };

  return (
    <Layout
      title="Вход"
      description="Пройдите авторизацию"
      className="container col-md-8 offset-md-2"
    >
      {showLoading()}
      {showError()}
      {logInForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Login;
