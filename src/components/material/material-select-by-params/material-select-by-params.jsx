import React, { useEffect, useState } from "react";
import { getMaterialProfileTypes } from "../../../api/apiMaterial";
import { getMaterialMarksList } from "../../../api/apiMatMarks"; // Импортируем метод для получения списка марок материала
import { isAuthenticated } from "../../../auth/index";
import "./styles.css"; // Подключаем стили
import MaterialFindByParams from "./MaterialFindByParams"; // Импортируем дочерний компонент

const MaterialSelectByParams = ({
  dim1: initialDim1,
  dim2: initialDim2,
  dim3: initialDim3,
  profile: initialProfile,
  density: initialDensity,
  handleSelectPopup,
}) => {
  const [materialData, setMaterialData] = useState({
    dim1: initialDim1,
    dim2: initialDim2,
    dim3: initialDim3,
    profile: initialProfile,
    density: initialDensity,
  });
  const [materialMarks, setMaterialMarks] = useState([]);
  const [profileTypes, setProfileTypes] = useState([]);
  const [dimensionLabels, setDimensionLabels] = useState({
    dim1: "Размер 1",
    dim2: "Размер 2",
    dim3: "Размер 3",
  });
  const [fieldVisibility, setFieldVisibility] = useState({
    dim1: true,
    dim2: true,
    dim3: true,
  });
  const { user, token } = isAuthenticated();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [marks, profiles] = await Promise.all([
          getMaterialMarksList(user._id, token),
          getMaterialProfileTypes(user._id, token),
        ]);
        setMaterialMarks(marks);
        setProfileTypes(profiles);
      } catch (err) {
        console.error("Ошибка при получении данных:", err);
      }
    };
    fetchData();
  }, [user._id, token]);

  useEffect(() => {
    if (materialData.profile) {
      const selectedProfile = profileTypes.find(
        (profile) => profile.name === materialData.profile
      );
      if (selectedProfile) {
        setDimensionLabels({
          dim1: selectedProfile.dim1Descr || "Размер 1",
          dim2: selectedProfile.dim2Descr || "Размер 2",
          dim3: selectedProfile.dim3Descr || "Размер 3",
        });
        setFieldVisibility({
          dim1: !!selectedProfile.dim1Descr,
          dim2: !!selectedProfile.dim2Descr,
          dim3: !!selectedProfile.dim3Descr,
        });
      }
    }
  }, [materialData.profile, profileTypes]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMaterialData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "profile") {
      const selectedProfile = profileTypes.find(
        (profile) => profile.name === value
      );
      if (selectedProfile) {
        setDimensionLabels({
          dim1: selectedProfile.dim1Descr || "Размер 1",
          dim2: selectedProfile.dim2Descr || "Размер 2",
          dim3: selectedProfile.dim3Descr || "Размер 3",
        });
        setFieldVisibility({
          dim1: !!selectedProfile.dim1Descr,
          dim2: !!selectedProfile.dim2Descr,
          dim3: !!selectedProfile.dim3Descr,
        });
        setMaterialData((prevData) => ({
          ...prevData,
          dim2: 0,
          dim3: 1,
        }));
      }
    }
  };

  const handleClose = () => {
    handleSelectPopup(0, false);
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <button type="button" className="close" onClick={handleClose}>
          &times;
        </button>
        <h5>Выбор материала</h5>
        <form>
          <div className="mb-3">
            <label htmlFor="profile" className="form-label">
              Профиль
            </label>
            <select
              id="profile"
              name="profile"
              className="form-select"
              value={materialData.profile || ""}
              onChange={handleInputChange}
            >
              <option value=""></option>
              {profileTypes.map((profile) => (
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
            <select
              id="markId"
              name="markId"
              className="form-select"
              value={materialData.markId || ""}
              onChange={handleInputChange}
            >
              <option value=""></option>
              {materialMarks.map((mark) => (
                <option key={mark.Id} value={mark.Id}>
                  {mark.name}
                </option>
              ))}
            </select>
          </div>

          {fieldVisibility.dim1 && (
            <div className="mb-3">
              <label htmlFor="dim1" className="form-label">
                {dimensionLabels.dim1}
              </label>
              <input
                type="number"
                id="dim1"
                name="dim1"
                className="form-control"
                value={materialData.dim1 || 0}
                onChange={handleInputChange}
              />
            </div>
          )}

          {fieldVisibility.dim2 && (
            <div className="mb-3">
              <label htmlFor="dim2" className="form-label">
                {dimensionLabels.dim2}
              </label>
              <input
                type="number"
                id="dim2"
                name="dim2"
                className="form-control"
                value={materialData.dim2 || 0}
                onChange={handleInputChange}
              />
            </div>
          )}

          {fieldVisibility.dim3 && (
            <div className="mb-3">
              <label htmlFor="dim3" className="form-label">
                {dimensionLabels.dim3}
              </label>
              <input
                type="number"
                id="dim3"
                name="dim3"
                className="form-control"
                value={materialData.dim3 || 0}
                onChange={handleInputChange}
              />
            </div>
          )}

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
              onChange={handleInputChange}
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
        </form>

        <MaterialFindByParams
          dim1={materialData.dim1}
          dim2={materialData.dim2}
          dim3={materialData.dim3}
          profile={materialData.profile}
          density={materialData.density}
        />
      </div>
    </div>
  );
};

export default MaterialSelectByParams;
