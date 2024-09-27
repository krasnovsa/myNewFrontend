import { useParams } from "react-router-dom";
import OrderList from "../components/order/order-list/order-list.jsx";
import Layout from "../components/layout.jsx";
import { ArrowBarDown } from "react-bootstrap-icons";

const Orders = () => {
  const { filterStr = "", loadMode = 0 } = useParams();

  return (
    <Layout
      title={
        <div>
          {"  "} <ArrowBarDown /> Заказы
        </div>
      }
      description="Информация о заказах"
      className="container"
    >
      <div className="row">
        <div className="col-12 col-md-6">
          <OrderList filterStr={filterStr} loadMode={loadMode} />
        </div>
      </div>
    </Layout>
  );
};

export default Orders;