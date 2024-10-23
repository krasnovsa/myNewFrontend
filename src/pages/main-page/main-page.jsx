import React, {useContext, useMemo} from 'react';
import Split from 'react-split';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'; // Подключим кастомные стили
import Layout from "../../components/layout.jsx";
import OrderList from '../../components/order/order-list/order-list';
import OiProdList from '../../components/oi/oi-prod-list/oi-prod-list';
import OiProdInfo from '../../components/oi/oi-prod-info.jsx';
import { CurrentAppContext } from "../../contexts/currentApp.jsx"; // Импортируем контекст


function MainPage() {

   const [{curOiProd,curPj}] = useContext(CurrentAppContext); // Получаем состояние из контекста
  const oi =  curOiProd; // Используем oi из props или из контекста
  const pj =  curPj; // Используем pj из props или из контекста
  const memoizedOi = useMemo(() => oi, [oi]);
  const memoizedPj = useMemo(() => pj, [pj]);
  console.log('repaint mainpage' )
  return (
    <div className="main-container">
      <Layout title='Управление заказами' description='Управляем заказами'>
        <Split
          sizes={[40, 60]}  // Начальные размеры 40% и 60% для первой и второй панели
          minSize={[600, 600]}  // Минимальная ширина в пикселях для левой и правой панели
          maxSize={[Infinity, Infinity]}  // Максимальная ширина для левой панели, правая может расширяться бесконечно
          direction="horizontal"
          style={{ display: 'flex', height: '100%' }}
        >
          {/* OrderInfoWindow */}
          <div className="pane">
              <OiProdList/>
          </div>

          <Split
            sizes={[50, 50]}  // Начальные размеры 50% и 50% для верхней и нижней панели
            minSize={[400, 400]}  // Минимальная высота в пикселях для верхней и нижней панели
            maxSize={[Infinity, Infinity]}  // Максимальная высота — без ограничений
            direction="vertical"
            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            {/* OrderListWindow */}
            <div className="pane">
              <OrderList/>
            </div>
            {/* ContextWindow */}
            <div className="pane">
              <OiProdInfo oi={memoizedOi} pj={memoizedPj}/>
            </div>
          </Split>
        </Split>
      </Layout>
    </div>
  );
}

export default MainPage;
