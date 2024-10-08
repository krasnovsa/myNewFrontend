import React from "react";
import Split from "react-split";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css"; // Подключим кастомные стили
import Layout from "../../components/layout.jsx";
import TpAddForm from "../../components/tp/tp-add-form/tp-add-form..jsx";


function ProductPage() {
  return (
    <div className="main-container">
      <Layout title="Управление продукцией" description="Управляем продукцией">
        <Split
          sizes={[40, 60]} // Начальные размеры 40% и 60% для первой и второй панели
          minSize={[600, 600]} // Минимальная ширина в пикселях для левой и правой панели
          maxSize={[Infinity, Infinity]} // Максимальная ширина для левой панели, правая может расширяться бесконечно
          direction="horizontal"
          style={{ display: "flex", height: "100%" }}
        >
          <div className="pane">
            <TpAddForm />
          </div>
          <div className="pane">
            Second window
          </div>
        </Split>
      </Layout>
    </div>
  );
}

export default ProductPage;
