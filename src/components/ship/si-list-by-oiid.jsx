import React, { useEffect, useState } from "react";
import { getSiList } from "../../api/apiShip";

const SiListByOiid = ({ oiId }) => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShipments = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getSiList({ oiId: oiId });
        setShipments(data);
      } catch (err) {
        setError("Ошибка при получении данных об отгрузках");
      } finally {
        setLoading(false);
      }
    };

    fetchShipments();
  }, [oiId]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Список отгрузок</h2>
      <ul>
        {shipments.map((shipment) => (
          <li key={shipment.Id}>
            {shipment.name} - {shipment.custName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SiListByOiid;