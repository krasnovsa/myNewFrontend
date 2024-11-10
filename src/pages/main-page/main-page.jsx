import "./styles.css"; // Подключим кастомные стили
import Layout from "../../components/layout/layout.jsx";
import OrderList from "../../components/order/order-list/order-list";
import OiProdList from "../../components/oi/oi-prod-list/oi-prod-list";
import OiProdInfo from "../../components/oi/oi-prod-info/oi-prod-info.jsx";
import { CurrentAppContext } from "../../contexts/currentApp.jsx"; // Импортируем контекст
import { useParams } from "react-router-dom";
import { useMemo, useContext } from "react";

function MainPage() {
  const { srchStr } = useParams(); // Получаем srchStr и initOrderId из параметров маршрута
  const [{ curOiProd, curPj }] = useContext(CurrentAppContext); // Получаем состояние из контекста
  const oi = curOiProd; // Используем oi из props или из контекста
  const pj = curPj; // Используем pj из props или из контекста
  const memoizedOi = useMemo(() => oi, [oi]);
  const memoizedPj = useMemo(() => pj, [pj]);
  console.log("repaint mainpage");

  return (
    <Layout title="Управление заказами" description="Управляем заказами">
      <div className="main-grid-container">
        {/* OrderInfoWindow */}
        <div className="prod-list">
          <OiProdList srchStr={srchStr} />
        </div>

        {/* OrderListWindow */}
        <div className="ord-list">
          <OrderList srchStr={srchStr}  />
        </div>

        {/* ContextWindow */}
        <div className="info">
          <OiProdInfo oi={memoizedOi} pj={memoizedPj} />
        </div>
      </div>
    </Layout>
  );
}

export default MainPage;
