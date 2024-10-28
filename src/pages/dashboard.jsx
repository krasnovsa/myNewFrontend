
import Layout from "../components/layout/layout";
import { isAuthenticated, checkWebRole } from "../auth";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const {
    user: { wwwUserName = "", fio = "", defAccId = "" },
    webRoles,
  } = isAuthenticated();

  const navigate = useNavigate();

  const userLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Доступные разделы</h4>
        <ul className="list-group">
          {checkWebRole(webRoles, "box") > 0 && (
            <li className="list-group-item d-flex justify-content-between">
              <Link
                className="nav-link"
                to={`/boxes/pageNumber/1/pageSize/30/textFilter`}
              >
                Отгрузки
              </Link>

              <button
                className="btn btn-outline-success mr-1"
                onClick={() => {
                  navigate("/box/addnew");
                }}
                style={{ display: "inline-block" }}
              >
                Добавить коробку
              </button>
            </li>
          )}
          {checkWebRole(webRoles, "ordPr") > 0 && (
            <li className="list-group-item d-flex justify-content-between">
              <Link className="nav-link" to={`/orders/0/`}>
                Заказы
              </Link>
            </li>
          )}
          {defAccId && checkWebRole(webRoles, "gt") > 0 && (
            <li className="list-group-item d-flex justify-content-between">
              <Link
                className="nav-link"
                to={`/gt/pageNumber/1/pageSize/30/parAccId/0/textFilter`}
              >
                Получить инструмент
              </Link>
            </li>
          )}
          {checkWebRole(webRoles, "rdsr") > 0 && (
            <li className="list-group-item d-flex justify-content-between">
              <Link
                className="nav-link"
                to={`/rdsr/pageNumber/1/pageSize/10/textFilter/`}
              >
                Отчеты пильного участка
              </Link>
            </li>
          )}
          {checkWebRole(webRoles, "wl") > 0 && (
            <li className="list-group-item d-flex justify-content-between">
              <Link className="nav-link" to={`/wl/byEmpl/pageNumber/1`}>
                Отчет журнала работ
              </Link>
            </li>
          )}
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Информация о пользователе</h3>
        <ul className="list-group">
          <li className="list-group-item">Логин: {wwwUserName}</li>
          <li className="list-group-item">ФИО: {fio}</li>
          <li className="list-group-item">
            Номер склада по умолчанию: {defAccId}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="Страница пользователя"
      description={`Добро пожаловать ${fio}!`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-12 col-md-4 mb-2">{userLinks()}</div>
        <div className="col-12 col-md-8 mb-2">{userInfo()}</div>
      </div>
    </Layout>
  );
};

export default Dashboard;