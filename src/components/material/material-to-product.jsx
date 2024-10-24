import React, { useState, useEffect, useCallback, useMemo } from "react";
import { getMaterialById } from "../../api/apiMaterial";
import { getProductById, updateProduct } from "../../api/apiProduct";

import PriceHistory from "./material-price-history";
import MaterialSelectByParams from "./material-select-by-params/material-select-by-params";

const MaterialToProduct = ({ prodId }) => {
  const [formData, setFormData] = useState({});
  const [material, setMaterial] = useState({}); // Объект материала
  const [priceData, setPriceData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newMaterialId, setNewMaterialId] = useState(0); // Добавляем состояние для нового matId

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productData = await getProductById(prodId);
        console.log("Полученные данные о продукте:", productData);
        setFormData(productData);
        setPriceData(productData.priceHistory || []);
      } catch (err) {
        console.error("Ошибка при получении данных о продукте:", err);
      }
    };

    fetchProductData();
  }, [prodId]);

  useEffect(() => {
    const fetchMaterial = async () => {
      if (formData.matId) {
        try {
          const materialData = await getMaterialById(formData.matId);
          console.log("Полученные данные о материале:", materialData);
          setMaterial(materialData || {});
        } catch (err) {
          console.error("Ошибка при получении данных о материале:", err);
        }
      } else {
        setMaterial({});
      }
    };

    fetchMaterial();
  }, [formData.matId]);

  useEffect(() => {
    const updateProductMaterial = async () => {
      if (newMaterialId > 0 && newMaterialId !== formData.matId) {
        try {
          console.log("start update product:", newMaterialId);
           await updateProduct(prodId, {
            ...formData,
            matId: newMaterialId,
          });
          setFormData({
            ...formData,
            matId: newMaterialId,
          });
        } catch (err) {
          console.error("Ошибка при обновлении продукта:", err);
        }
      } else {
        console.log("остался материал с Id:", newMaterialId);
      }
    };

    updateProductMaterial();
  }, [newMaterialId, formData.matId, prodId]);

  const handleSelectMaterial = useCallback((materialId, popupState) => {
    setNewMaterialId(materialId);
    setShowPopup(popupState);
  }, []);

  const handleInputChange = useCallback(async (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
  
    try {
      // Обновляем продукт по API
       await updateProduct(prodId, updatedFormData);
      // Обновляем состояние с новыми данными продукта
      setFormData(updatedFormData);
    } catch (err) {
      console.error("Ошибка при обновлении продукта:", err);
    }
  }, [formData]);

  const handleShowPopup = useCallback(() => {
    handleSelectMaterial(0, true);
  }, [handleSelectMaterial]);

  // Мемоизация объекта material и функции handleSelectPopup
  const memoizedMaterial = useMemo(() => material, [material]);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <form>
            <input
              type="hidden"
              id="matId"
              name="matId"
              value={formData.matId || 0}
              onChange={handleInputChange}
            />
            <div className="input-group mb-3">
             <div className="input-group-prepend">
                <label htmlFor="materialName" className="input-group-text">
                  Материал
                </label>
              </div>
              <input
                type="text"
                id="materialName"
                name="materialName"
                className="form-control"
                value={material.name || ""}
                readOnly
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleShowPopup}
                >
                  Выбрать
                </button>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="lenght" className="form-label">
                Длина
              </label>
              <input
                type="number"
                id="lenght"
                name="lenght"
                className="form-control"
                value={formData.lenght || 0}
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
                value={formData.resQttToOne || 1}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <PriceHistory priceData={priceData} />
        </div>
      </div>
      {showPopup && (
        <MaterialSelectByParams
          material={memoizedMaterial}
          handleSelectMaterial={handleSelectMaterial}
        />
      )}
    </div>
  );
};

export default MaterialToProduct;