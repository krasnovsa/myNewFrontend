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
  const [newMaterialId, setNewMaterialId] = useState(null);

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
          const materialData = await getMaterialById(
            formData.matId
          );
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
          const updatedProduct = await updateProduct( prodId, {
            ...formData,
            matId: newMaterialId,
          });
          console.log("Продукт обновлен:", updatedProduct);
          setFormData(updatedProduct);
        } catch (err) {
          console.error("Ошибка при обновлении продукта:", err);
        }
      } else {
        console.log("остался материал с Id:", newMaterialId);
      }
    };

    updateProductMaterial();
  }, [newMaterialId, formData.matId, prodId ]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSelectPopup = useCallback((matId, showPopupState) => {
    setShowPopup(showPopupState);
    setNewMaterialId(matId);
  }, []);

  const handleShowPopup = useCallback(() => {
    handleSelectPopup(0, true);
  }, [handleSelectPopup]);

  // Мемоизация объекта material и функции handleSelectPopup
  const memoizedMaterial = useMemo(() => material, [material]);
  const memoizedHandleSelectPopup = useMemo(() => handleSelectPopup, [handleSelectPopup]);

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
            <div className="mb-3">
              <label htmlFor="materialName" className="form-label">
                Наименование материала
              </label>
              <input
                type="text"
                id="materialName"
                name="materialName"
                className="form-control"
                value={material.name || ""}
                readOnly
              />
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
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleShowPopup}
            >
              Выбрать
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <PriceHistory priceData={priceData} />
        </div>
      </div>
      {showPopup && (
        <MaterialSelectByParams
          material={memoizedMaterial}
          handleSelectPopup={memoizedHandleSelectPopup} // Передаем мемоизированную функцию handleSelectPopup
        />
      )}
    </div>
  );
};

export default MaterialToProduct;