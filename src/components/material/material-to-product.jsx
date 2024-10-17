import React, { useState, useEffect } from "react";
import { getMaterialProfileTypes } from "../../api/apiMaterial";
import { getProductById } from "../../api/apiProduct";
import { isAuthenticated } from "../../auth/index";

const MaterialToProduct = ({ prodId }) => {
  const { user, token } = isAuthenticated();
  const [formData, setFormData] = useState({
    matProfile: 0,
    markId: 0,
    dim1: 0,
    dim2: 0,
    dim3: 0,
    length: 0,
    resQttToOne: 1,
  });
  const [profiles, setProfiles] = useState([]);
  const [dimLabels, setDimLabels] = useState({
    dim1: "Размер 1, мм",
    dim2: "Размер 2, мм",
    dim3: "Размер 3, мм",
    length: "Длина, мм",
    resQttToOne: "Количество на 1 изделие",
  });
  const [dimVisibility, setDimVisibility] = useState({
    dim1: true,
    dim2: true,
    dim3: true,
  });

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await getMaterialProfileTypes(user._id, token);
        console.log("Полученные данные о профилях материала:", data);
        if (Array.isArray(data)) {
          setProfiles(data);
        } else {
          console.error("Полученные данные не являются массивом:", data);
        }
      } catch (err) {
        console.error("Ошибка при получении данных о профилях материала:", err);
      }
    };

    const fetchProductData = async () => {
      try {
        const productData = await getProductById(user._id, token, prodId);
        console.log("Полученные данные о продукте:", productData);
        setFormData({
          matProfile: productData.matProfile || "Круг",
          markId: productData.matMark || 0,
          dim1: productData.dim1 || 0,
          dim2: productData.dim2 || 0,
          dim3: productData.dim3 || 0,
          length: productData.length || 0,
          resQttToOne: productData.resQttToOne || 1,
        });
      } catch (err) {
        console.error("Ошибка при получении данных о продукте:", err);
      }
    };

    fetchProfiles();
    fetchProductData();
  }, [user._id, token, prodId]);

  useEffect(() => {
    const selectedProfile = profiles.find(
      (profile) => profile.name === formData.matProfile
    );
    if (selectedProfile) {
      setDimLabels({
        dim1: selectedProfile.dim1Descr || "Размер 1, мм",
        dim2: selectedProfile.dim2Descr || "Размер 2, мм",
        dim3: selectedProfile.dim3Descr || "Размер 3, мм",
      });
      console.log("Выбранный профиль материала:", selectedProfile);
      setDimVisibility({
        dim1: selectedProfile.dim1Descr !== null,
        dim2: selectedProfile.dim2Descr !== null,
        dim3: selectedProfile.dim3Descr !== null,
      });
    }
  }, [formData.matProfile, profiles]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="profile" className="form-label">
          Профиль
        </label>
        <select
          id="matProfile"
          name="matProfile"
          className="form-select"
          value={formData.matProfile}
          onChange={handleInputChange}
        >
          <option value="">Выберите профиль</option>
          {Array.isArray(profiles) &&
            profiles.map((profile) => (
              <option key={profile.name} value={profile.name}>
                {profile.name}
              </option>
            ))}
        </select>
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
          value={formData.markId}
          onChange={handleInputChange}
        />
      </div>

      {dimVisibility.dim1 && (
        <div className="mb-3">
          <label htmlFor="dim1" className="form-label">
            {dimLabels.dim1}
          </label>
          <input
            type="number"
            id="dim1"
            name="dim1"
            className="form-control"
            value={formData.dim1}
            onChange={handleInputChange}
          />
        </div>
      )}
      {dimVisibility.dim2 && (
        <div className="mb-3">
          <label htmlFor="dim2" className="form-label">
            {dimLabels.dim2}
          </label>
          <input
            type="number"
            id="dim2"
            name="dim2"
            className="form-control"
            value={formData.dim2}
            onChange={handleInputChange}
          />
        </div>
      )}
      {dimVisibility.dim3 && (
        <div className="mb-3">
          <label htmlFor="dim3" className="form-label">
            {dimLabels.dim3}
          </label>
          <input
            type="number"
            id="dim3"
            name="dim3"
            className="form-control"
            value={formData.dim3}
            onChange={handleInputChange}
          />
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="length" className="form-label">
          Длина
        </label>
        <input
          type="number"
          id="length"
          name="length"
          className="form-control"
          value={formData.length}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="resQttToOne" className="form-label">
          Количество на 1 изделие
        </label>
        <input
          type="number"
          id="resQttToOne"
          name="resQttToOne"
          className="form-control"
          value={formData.resQttToOne}
          onChange={handleInputChange}
        />
      </div>
    </form>
  );
};

export default MaterialToProduct;
