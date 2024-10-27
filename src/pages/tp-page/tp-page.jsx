import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/layout.jsx";
import TpListForm from "../../components/tp/tp-list-form/tp-list-form";
import TpAddForm from "../../components/tp/tp-add-form/tp-add-form";
import AttViewer from "../../components/attachments/att-viewer/att-viewer"; // Импортируем компонент AttViewer
import "./styles.css"; // Импортируем стили

const TpPage = () => {
  const { prodId } = useParams(); // Получаем prodId из параметров маршрута

  return (
    <div className="main-container">
      <Layout
        title="Создание/редактирование техпроцесса"
        description="Здесь можно создавать и редактировать техпроцессы"
      >
        <div className="tp-page">
          <div className="page-container">
            <div className="tp-list">
              <h2>Список техпроцессов</h2>
              <TpListForm prodId={parseInt(prodId, 10)} />
            </div>
            <div className="tp-add">
              <h2>Создание техпроцесса</h2>
              <TpAddForm prodId={parseInt(prodId, 10)} />
            </div>
            <div className="viewer">
              <AttViewer tableName="Products" keyValue={parseInt(prodId, 10)} />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default TpPage;
