import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../components/layout/layout";
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

  const clickSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    try {
      const data = await login({ wwwUserName, wwwPass });
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
    } catch (error) {
      setValues({ ...values, error: 'Ошибка сервера', loading: false });
    }
  };

  const logInForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Имя пользователя</label>
        <input
          onChange={handleChange("wwwUserName")}
          type="email"
          className="form-control"
          value={wwwUserName}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Пароль</label>
        <input
          onChange={handleChange("wwwPass")}
          type="password"
          className="form-control"
          value={wwwPass}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Войти
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
        <h2>Загрузка...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer || isAuthenticated()) {
      return <Navigate to="/dashboard" />;
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