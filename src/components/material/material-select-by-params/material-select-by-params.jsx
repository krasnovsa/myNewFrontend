import React, { useEffect, useState } from "react";
import { getMaterialById } from "../../../api/apiMaterial";
import { isAuthenticated } from "../../../auth/index";
import "./styles.css"; // Подключаем стили

const MaterialSelectByParams = ({ matId, handleClose }) => {
  const [materialData, setMaterialData] = useState({});
  const { user, token } = isAuthenticated();

  useEffect(() => {

    const fetchMaterialData = async () => {
      try {
        const data = await getMaterialById(matId, user._id, token);
        console.log("Полученные данные о материале:", data);
        setMaterialData(data);
      } catch (err) {
        console.error("Ошибка при получении данных о материале:", err);
      }
    };

    if (matId) {
      fetchMaterialData();
    }
  }, [matId]);

  if (!matId) {
    return null;
  }

  return (
    <div className="popup">
      <div className="popup-inner">
        <button type="button" className="close" onClick={handleClose}>
          &times;
        </button>
        <h5>Выбор материала</h5>
        <form>
          <div className="mb-3">
            <label htmlFor="matProfile" className="form-label">
              Профиль
            </label>
            <input
              type="text"
              id="matProfile"
              name="matProfile"
              className="form-control"
              value={materialData.matProfile || ""}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label htmlFor="markId" className="form-label">
              Марка материала
            </label>
            <input
              type="number"
              id="markId"
              name="markId"
              className="form-control"
              value={materialData.markId || 0}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label htmlFor="dim1" className="form-label">
              Размер 1
            </label>
            <input
              type="number"
              id="dim1"
              name="dim1"
              className="form-control"
              value={materialData.dim1 || 0}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label htmlFor="dim2" className="form-label">
              Размер 2
            </label>
            <input
              type="number"
              id="dim2"
              name="dim2"
              className="form-control"
              value={materialData.dim2 || 0}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label htmlFor="dim3" className="form-label">
              Размер 3
            </label>
            <input
              type="number"
              id="dim3"
              name="dim3"
              className="form-control"
              value={materialData.dim3 || 0}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label htmlFor="qlt" className="form-label">
              Качество
            </label>
            <input
              type="text"
              id="qlt"
              name="qlt"
              className="form-control"
              value={materialData.qlt || ""}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label htmlFor="mass1m" className="form-label">
              Масса 1м
            </label>
            <input
              type="number"
              id="mass1m"
              name="mass1m"
              className="form-control"
              value={materialData.mass1m || 0}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lastPrice" className="form-label">
              Последняя цена
            </label>
            <input
              type="number"
              id="lastPrice"
              name="lastPrice"
              className="form-control"
              value={materialData.lastPrice || 0}
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MaterialSelectByParams;
