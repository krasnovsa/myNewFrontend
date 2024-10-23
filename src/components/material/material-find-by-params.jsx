import React, { useState, useEffect } from "react";
import { findMaterialByParams } from "../../api/apiMaterial";
import { isAuthenticated } from "../../auth/index";

const MaterialFindByParams = ({ params }) => {
  const { user, token } = isAuthenticated();
  const [material, setMaterial] = useState(null);

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        console.log("Параметры", params);
        const materialData = await findMaterialByParams(user._id, token, params);
        setMaterial(materialData);
        console.log("Полученные данные о материале:", materialData);
      } catch (err) {
        console.error("Ошибка при поиске материала:", err);
      }
    };

    fetchMaterial();
  }, [params, user._id, token]);

  if (!material) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <h5>Параметры материала</h5>
      <p>
        <strong>Размер 1:</strong> {material.dim1}
      </p>
      <p>
        <strong>Размер 2:</strong> {material.dim2}
      </p>
      <p>
        <strong>Размер 3:</strong> {material.dim3}
      </p>
      <p>
        <strong>Профиль:</strong> {material.profile}
      </p>
      <p>
        <strong>Плотность:</strong> {material.density}
      </p>
      <p>
        <strong>Марка:</strong> {material.markId}
      </p>
      <p>
        <strong>Качество:</strong> {material.qlt}
      </p>
    </div>
  );
};

export default MaterialFindByParams;