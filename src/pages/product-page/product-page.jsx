import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css"; // Подключим кастомные стили
import Layout from "../../components/layout.jsx";
import TpAddForm from "../../components/tp/tp-add-form/tp-add-form.jsx";
import TpListForm from "../../components/tp/tp-list-form/tp-list-form.jsx";
import AttViewer from "../../components/attachments/att-viewer/att-viewer.jsx";

import { getProductById } from "../../api/apiProduct.js";
import { isAuthenticated } from "../../auth/index.js";
import { CurrentAppContext } from "../../contexts/currentApp.jsx";

function ProductPage() {
  const [prodId, setProdId] = useState("");
  const [state, dispatch] = useContext(CurrentAppContext);
  const { user, token } = isAuthenticated();

  useEffect(() => {
    const fetchProduct = async () => {
      if (prodId) {
        try {
          const product = await getProductById(user._id, token, prodId);
          dispatch({ type: "SET_CUR_PRODUCT", payload: product });
        } catch (err) {
          console.error("Ошибка при получении информации о продукте:", err);
        }
      }
    };

    fetchProduct();
  }, [prodId, user._id, token, dispatch]);

  const handleProdIdChange = (event) => {
    setProdId(event.target.value);
  };

  return (
    <div className="main-container">
      <Layout title="Управление продукцией" description="Управляем продукцией">
        <div className="grid-container">
          <div className="grid-item header">
            <h1>Верхняя левая панель</h1>
            <div className="prod-id-input">
              <label htmlFor="prodId">Product ID:</label>
              <input
                type="text"
                id="prodId"
                value={prodId}
                onChange={handleProdIdChange}
              />
            </div>    
          </div>
          <div className="grid-item header">
            <AttViewer keyValue = {prodId} tableName = 'Products'></AttViewer >
          </div>
          <div className="grid-item left-pane">
            <TpAddForm prodId={state.curProduct ? state.curProduct.Id : 0} />
          </div>
          <div className="grid-item right-pane">

            <TpListForm prodId={prodId} />
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default ProductPage;