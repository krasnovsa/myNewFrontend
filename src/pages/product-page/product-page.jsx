import React, { useState, useEffect, useContext } from "react";
import Split from "react-split";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css"; // Подключим кастомные стили
import Layout from "../../components/layout.jsx";
import TpAddForm from "../../components/tp/tp-add-form/tp-add-form.jsx";
import TpListForm from "../../components/tp/tp-list-form/tp-list-form.jsx";
import { getProductById } from "../../api/apiProduct";
import { isAuthenticated } from "../../auth";
import { CurrentAppContext } from "../../contexts/currentApp";

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
        <Split
          sizes={[40, 60]} // Начальные размеры 40% и 60% для первой и второй панели
          minSize={[600, 600]} // Минимальная ширина в пикселях для левой и правой панели
          maxSize={[Infinity, Infinity]} // Максимальная ширина для левой панели, правая может расширяться бесконечно
          direction="horizontal"
          style={{ display: "flex", height: "100%" }}
        >
          <div className="pane">
            <TpAddForm prodId={state.curProduct ? state.curProduct.Id : 0} />
          </div>
          <div className="pane">
            <div className="prod-id-input">
              <label htmlFor="prodId">Product ID:</label>
              <input
                type="text"
                id="prodId"
                value={prodId}
                onChange={handleProdIdChange}
              />
            </div>
            <TpListForm prodId={prodId} />
          </div>
        </Split>
      </Layout>
    </div>
  );
}

export default ProductPage;