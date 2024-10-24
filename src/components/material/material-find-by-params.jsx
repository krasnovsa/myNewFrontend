import React, { useState, useEffect } from "react";
import {
  findMaterialByParams,
  createMaterial,
  updateMaterial,
} from "../../api/apiMaterial";
import calculateMaterialProperties from "./calc-mat-mass";

const MaterialFindByParams = ({ params, handleClose }) => {
  const [material, setMaterial] = useState(null);
  const [calculatedMaterial, setCalculatedMaterial] = useState(null);
  const [lastPrice, setLastPrice] = useState(""); // Состояние для последней цены
  const [newPrice, setNewPrice] = useState(""); // Состояние для новой цены
  const [loading, setLoading] = useState(true); // Состояние для загрузки

  const fetchMaterial = async () => {
    try {
      const materialData = await findMaterialByParams(params);
      if (Array.isArray(materialData) && materialData.length > 0) {
        setMaterial(materialData[0]);
        console.log("found material data", materialData[0]);
      } else {
        console.error("Материал не найден или данные некорректны");
        const calculated = calculateMaterialProperties(
          params.dim1,
          params.dim2,
          params.dim3,
          params.profile,
          params.density,
          params.markName,
          params.qlt
        );
        console.log("calculated", calculated);
        setCalculatedMaterial(calculated);
        setMaterial(null);
      }
    } catch (err) {
      console.error("Ошибка при поиске материала:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterial();
  }, [params]);

  const handleCreateMaterial = async () => {
    try {
      const newMaterial = {
        name: calculatedMaterial.matName,
        mass1m: calculatedMaterial.mass1m,
        profile: params.profile,
        dim1: params.dim1,
        dim2: params.dim2,
        dim3: params.dim3,
        qlt: params.qlt,
        lastPrice: lastPrice || 0,
        markId: params.markId,
      };
      await createMaterial(newMaterial);
      fetchMaterial(); // Повторный вызов для обновления компонента
    } catch (err) {
      console.error("Ошибка при создании материала:", err);
    }
  };

  const handleUpdateMaterial = async () => {
    try {
      const updatedMaterial = {
        ...material,
        lastPrice: newPrice || material.lastPrice,
      };
      await updateMaterial(material.Id, updatedMaterial);
      fetchMaterial(); // Повторный вызов для обновления компонента
    } catch (err) {
      console.error("Ошибка при обновлении материала:", err);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("ru-RU", options);
  };

  if (loading) {
    return (
      <div className="alert alert-success">
        <p>
          <strong>Загрузка ...</strong>
        </p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h5>Параметры материала</h5>
      {material ? (
        <div className="alert alert-success">
          <p>
            <strong>Название:</strong> {material.name}
          </p>
          <p>
            <strong>Масса 1 метра:</strong> {material.mass1m} кг
          </p>
          <p>
            <strong>Последняя цена:</strong> {material.lastPrice} руб. от{" "}
            {formatDate(material.lastPriceDate)}
          </p>
          <div className="input-group mb-3">
            <span className="input-group-text" id="newPriceLabel">
              Новая цена:
            </span>
            <input
              type="number"
              id="newPrice"
              className="form-control"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              aria-describedby="newPriceLabel"
            />
            <button
              className="btn btn-primary"
              onClick={handleUpdateMaterial}
              disabled={!newPrice || isNaN(newPrice)}
            >
              Обновить
            </button>
          </div>
          <button className="btn btn-secondary" onClick={handleClose}>
            Выбрать
          </button>
        </div>
      ) : (
        <div className="alert alert-warning">
          <p>Материал не найден</p>
          <p>
            <strong>Рассчитанное название:</strong> {calculatedMaterial.matName}
          </p>
          <p>
            <strong>Масса 1 метра:</strong> {calculatedMaterial.mass1m} кг
          </p>
          <div className="input-group mb-3">
            <span className="input-group-text" id="lastPriceLabel">
              Последняя цена:
            </span>
            <input
              type="number"
              id="lastPrice"
              className="form-control"
              value={lastPrice}
              onChange={(e) => setLastPrice(e.target.value)}
              aria-describedby="lastPriceLabel"
            />
            <button
              className="btn btn-primary"
              onClick={handleCreateMaterial}
              disabled={!lastPrice || isNaN(lastPrice)}
            >
              Создать материал
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialFindByParams;
