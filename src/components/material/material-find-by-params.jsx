import React, { useState, useEffect } from "react";
import { findMaterialByParams } from "../../api/apiMaterial";
import calculateMaterialProperties from "./calc-mat-mass";

const MaterialFindByParams = ({ params }) => {
  const [material, setMaterial] = useState(null);
  const [calculatedMaterial, setCalculatedMaterial] = useState(null);
  const [lastPrice, setLastPrice] = useState(""); // Состояние для последней цены
 

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const materialData = await findMaterialByParams(params);
        if (Array.isArray(materialData) && materialData.length > 0) {
          setMaterial(materialData[0]);
          console.log('found material data', materialData[0]);
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
          console.log('calculated', calculated);
          setCalculatedMaterial(calculated);
          setMaterial(null);
        }
      } catch (err) {
        console.error("Ошибка при поиске материала:", err);
      }
    };

    fetchMaterial();
  }, [params]);

  const handleCreateMaterial = async () => {
    try {
      const newMaterial = {
        name: calculatedMaterial.matName,
        density: params.density,
        profile: params.profile,
        dim1: params.dim1,
        dim2: params.dim2,
        dim3: params.dim3,
        qlt: params.qlt,
        lastPrice: lastPrice,
      };
      // await createMaterialMark(newMaterial);
      console.log("Материал успешно создан");
    } catch (err) {
      console.error("Ошибка при создании материала:", err);
    }
  };

  if (!material && !calculatedMaterial) {
    return (
     <div className="alert alert-success">
      <p>
      <strong>Загрузка ...</strong> 
      </p>
    </div>);
  }

  return (
    <div className="container mt-4">
      <h5>Параметры материала</h5>
      {material ? (
        <div className="alert alert-success">
          <p>
            <strong>Название:</strong> {material.name}
          </p>
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
          <div className="mb-3">
            <label htmlFor="lastPrice" className="form-label">Последняя цена:</label>
            <input
              type="text"
              id="lastPrice"
              className="form-control"
              value={lastPrice}
              onChange={(e) => setLastPrice(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={handleCreateMaterial}>Создать материал</button>
        </div>
      )}
    </div>
  );
};

export default MaterialFindByParams;