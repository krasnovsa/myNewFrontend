import React from "react";

const MaterialFindByParams = ({ dim1, dim2, dim3, profile, density }) => {
  return (
    <div>
      <h5>Параметры материала</h5>
      <p>
        <strong>Размер 1:</strong> {dim1}
      </p>
      <p>
        <strong>Размер 2:</strong> {dim2}
      </p>
      <p>
        <strong>Размер 3:</strong> {dim3}
      </p>
      <p>
        <strong>Профиль:</strong> {profile}
      </p>
      <p>
        <strong>Плотность:</strong> {density}
      </p>
    </div>
  );
};

export default MaterialFindByParams;
