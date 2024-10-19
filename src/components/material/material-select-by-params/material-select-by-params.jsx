import React, { useEffect, useState, useCallback } from "react";
import {
  getMaterialById,
  getMaterialProfileTypes,
  findMaterialByParams,
} from "../../../api/apiMaterial";
import { getMaterialMarksList } from "../../../api/apiMatMarks"; // Импортируем метод для получения списка марок материала
import { isAuthenticated } from "../../../auth/index";
import "./styles.css"; // Подключаем стили
import calculateMaterialProperties from "../calc-mat-mass"; // Импортируем функцию расчета массы

const MaterialSelectByParams = ({ matId, handleClose }) => {
  const [materialData, setMaterialData] = useState({});
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
  const [foundMaterial, setFoundMaterial] = useState(null);
  const { user, token } = isAuthenticated();
  const [isMounted, setIsMounted] = useState(false); // Флаг для отслеживания монтирования

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

    const fetchMaterialMarks = async () => {
      try {
        const marks = await getMaterialMarksList(user._id, token);
        setMaterialMarks(marks);
      } catch (err) {
        console.error("Ошибка при получении списка марок материала:", err);
      }
    };

    const fetchProfileTypes = async () => {
      try {
        const profiles = await getMaterialProfileTypes(user._id, token);
        setProfileTypes(profiles);
      } catch (err) {
        console.error("Ошибка при получении списка профилей:", err);
      }
    };

    if (matId && !isMounted) {
      fetchMaterialData();
      fetchMaterialMarks();
      fetchProfileTypes();
      setIsMounted(true); // Устанавливаем флаг после первого монтирования
    }
  }, [matId, user._id, token, isMounted]);

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

  const searchMaterial = useCallback(
    async (params) => {
      try {
        console.log("Поиск материала по параметрам  ", params);
        const result = await findMaterialByParams(user._id, token, params);
                             
        if (result.length > 0) {
          console.log("Найден материал:", result[0]);
          setFoundMaterial(result[0]);
          setMaterialData((prevData) => ({
            ...prevData,
            mass1m: result[0].mass1m,

          }));
        } else {
          console.log("Такого материала нет");
          // Рассчитываем массу 1 метра и имя нового материала
          const calculated = calculateMaterialProperties(
            params.dim1,
            params.dim2,
            params.dim3,
            params.profile,
            materialMarks.find((mark) => mark.Id == params.markId)?.density ||
              0,
            materialMarks.find((mark) => mark.Id == params.markId)?.name || "",
            params.qlt
          );

          setFoundMaterial({
            ...calculated,
            dim1: params.dim1,
            dim2: params.dim2,
            dim3: params.dim3,
            profile: params.profile,
            density:
              materialMarks.find((mark) => mark.Id == params.markId)?.density ||
              0,
            markName:
              materialMarks.find((mark) => mark.Id == params.markId)?.name ||
              "",
            qlt: params.qlt,
            Id: 0,

          });

          setMaterialData((prevData) => ({
            ...prevData,
            mass1m: calculated.mass1m,

          }));
        }
      } catch (err) {
        console.error("Ошибка при поиске материала:", err);
        setFoundMaterial("Ошибка при поиске материала");
        setMaterialData((prevData) => ({
          ...prevData,
          mass1m: 0,

        }));
      }
    },
    [user._id, token, materialMarks]
  );

  useEffect(() => {
    const initialSearch = async () => {
      const params = {
        markId: materialData.markId,
        dim1: materialData.dim1,
        dim2: materialData.dim2 || 0,
        dim3: materialData.dim3 || 1,
        qlt: materialData.qlt || null,
        profile: materialData.profile,
      };

      if (materialData.markId && materialData.dim1 && materialData.profile) {
        await searchMaterial(params);
      }
    };

    initialSearch();
  }, [materialData.markId, 
    materialData.dim1, 
    materialData.profile, 
    searchMaterial, 
    materialData.dim2, 
    materialData.dim3, 
    materialData.qlt]);

  const handleInputChange = async (e) => {
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

    // Направляем запрос findMaterialByParams при изменении значений
    const params = {
      markId: name === "markId" ? value : materialData.markId,
      dim1: name === "dim1" ? value : materialData.dim1,
      dim2: name === "dim2" ? value : materialData.dim2 || 0,
      dim3: name === "dim3" ? value : materialData.dim3 || 1,
      qlt:
        name === "qlt"
          ? value === ""
            ? null
            : value
          : materialData.qlt || null,
      profile: name === "profile" ? value : materialData.profile,
    };

    console.log("params", params);

    await searchMaterial(params);

    // Обновляем подписи к размерам и видимость полей при изменении профиля
  };

  const handleMass1mChange = (e) => {
    const { value } = e.target;
    setFoundMaterial((prevData) => ({
      ...prevData,
      mass1m: value,
  

    }));
  };



  const handleCreateMaterial = () => {
    // Логика создания нового материала
    console.log("Создать новый материал");
  };

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
              value={
                foundMaterial && foundMaterial !== "Такого материала нет"
                  ? foundMaterial.mass1m
                  : 0
              }
              onChange={handleMass1mChange}
            />
          </div>

        
        </form>

        {foundMaterial && foundMaterial.matName && (
          <>
            <button
              className="btn btn-primary mt-3"

            >
              Создать материал
            </button>
            <div className="mt-3">
              <strong>Расчетные значения:</strong>
              <p>Масса 1м: {foundMaterial.mass1m} кг</p>
              <p>Название: {foundMaterial.matName}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MaterialSelectByParams;
