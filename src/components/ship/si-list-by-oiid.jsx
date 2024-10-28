import React, { useEffect, useState } from "react";
import { getSiList } from "../../api/apiShip";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const SiListByOiid = ({ oiId, initFields }) => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fields, setFields] = useState(
    initFields || [
      { field: "Id", width: 100, header: "Id" },
      { field: "name", width: 200, header: "Продукция" },
      { field: "shipDate", width: 200, header: "Дата отгрузки" },
      { field: "qtt", width: 100, header: "Количество" },
      { field: "num", width: 100, header: "Номер документа" },
      // Add more fields as needed
    ]
  );
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [selectedRow, setSelectedRow] = useState(null);

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

  const sortedShipments = React.useMemo(() => {
    let sortableShipments = [...shipments];
    if (sortConfig.key !== null) {
      sortableShipments.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableShipments;
  }, [shipments, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleRowClick = (id) => {
    setSelectedRow(id);
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            {fields.map((field) => (
              <th
                key={field.field}
                style={{ width: field.width, cursor: "pointer" }}
                onClick={() => requestSort(field.field)}
              >
                {field.header}
                {sortConfig.key === field.field ? (
                  sortConfig.direction === "ascending" ? (
                    <span> ▲</span>
                  ) : (
                    <span> ▼</span>
                  )
                ) : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedShipments.map((shipment) => (
            <tr
              key={shipment.Id}
              className={selectedRow === shipment.Id ? "table-active" : ""}
              onClick={() => handleRowClick(shipment.Id)}
            >
              {fields.map((field) => (
                <td key={field.field}>{shipment[field.field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SiListByOiid;
