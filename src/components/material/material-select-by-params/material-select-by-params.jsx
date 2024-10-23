import React, { useEffect, useState, useCallback, useMemo } from "react";
import { getMaterialProfileTypes } from "../../../api/apiMaterial";
import { getMaterialMarksList } from "../../../api/apiMatMarks";
import "./styles.css";
import MaterialFindByParams from "../material-find-by-params";

const MaterialSelectByParams = ({ material, handleSelectPopup }) => {
  const [materialData, setMaterialData] = useState(material);
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
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [marks, profiles] = await Promise.all([
          getMaterialMarksList(),
          getMaterialProfileTypes(),
        ]);
        setMaterialMarks(marks);
        setProfileTypes(profiles);

        // Обновляем materialData с текущими значениями плотности и названия марки материала
        const selectedMark = marks.find((mark) => mark.Id === material.markId);
        if (selectedMark) {
          setMaterialData((prevData) => ({
            ...prevData,
            density: selectedMark.density,
            markName: selectedMark.name,
          }));
        }
      } catch (err) {
        console.error("Ошибка при получении данных:", err);
      }
    };
    fetchData();
  }, [material.markId]);

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

  const handleInputChange = useCallback((e) => {
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

    if (name === "markId") {
      const selectedMark = materialMarks.find((mark) => mark.Id === value);
      if (selectedMark) {
        setMaterialData((prevData) => ({
          ...prevData,
          density: selectedMark.density,
          markName: selectedMark.name,
        }));
      }
    }
  }, [profileTypes, materialMarks]);

  const handleClose = useCallback(() => {
    handleSelectPopup(0, false);
  }, [handleSelectPopup]);

  const memoizedMaterialData = useMemo(() => materialData, [materialData]);

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
        </form>

        <MaterialFindByParams
          params={memoizedMaterialData} // Передаем мемоизированный объект materialData как params
          handleSelectPopup={handleSelectPopup}
        />
      </div>
    </div>
  );
};

export default MaterialSelectByParams;