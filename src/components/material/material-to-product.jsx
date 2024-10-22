import React, { useState, useEffect } from "react";
import { getMaterialById } from "../../api/apiMaterial";
import { getProductById, updateProduct } from "../../api/apiProduct";
import { isAuthenticated } from "../../auth/index";
import PriceHistory from "./material-price-history";
import MaterialSelectByParams from "./material-select-by-params/material-select-by-params";

const MaterialToProduct = ({ prodId }) => {
  const { user, token } = isAuthenticated();
  const [formData, setFormData] = useState({});
  const [materialName, setMaterialName] = useState("");
  const [priceData, setPriceData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newMaterialId, setNewMaterialId] = useState(null); // Новое состояние

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productData = await getProductById(user._id, token, prodId);
        console.log("Полученные данные о продукте:", productData);
        setFormData(productData); // Записываем весь объект productData
        setPriceData(productData.priceHistory || []);
      } catch (err) {
        console.error("Ошибка при получении данных о продукте:", err);
      }
    };

    fetchProductData();
  }, [user._id, token, prodId]);

  useEffect(() => {
    const fetchMaterialName = async () => {
      if (formData.matId) {
        try {
          const materialData = await getMaterialById(
            formData.matId,
            user._id,
            token
          );
          console.log("Полученные данные о материале:", materialData);
          setMaterialName(materialData.name || "");
        } catch (err) {
          console.error("Ошибка при получении данных о материале:", err);
        }
      } else {
        setMaterialName("");
      }
    };

    fetchMaterialName();
  }, [formData.matId, user._id, token]);

  useEffect(() => {
    const updateProductMaterial = async () => {
      if (newMaterialId > 0 && newMaterialId !== formData.matId) {
        
        try {
          console.log("start update product:", newMaterialId);
          const updatedProduct = await updateProduct(user._id, token, prodId, {
            ...formData,
            matId: newMaterialId,
          });
          console.log("Продукт обновлен:", updatedProduct);
          
          setFormData(updatedProduct); // Обновляем состояние formData с данными из обновленного продукта
        } catch (err) {
          console.error("Ошибка при обновлении продукта:", err);
        }
      } else {
        console.log("остался материал с Id:", newMaterialId);
      }
    };

    updateProductMaterial();
  }, [newMaterialId, formData.matId, prodId, user._id, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectPopup = (matId, showPopupState) => {
   setShowPopup(showPopupState); 
   setNewMaterialId(matId);
    
  };

  const handleShowPopup = () => {
    handleSelectPopup(0, true);
  };

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
                value={materialName}
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
          matId={formData.matId}
          handleSelectPopup={handleSelectPopup}
          setShowPopup={setShowPopup} // Передаем функцию
        />
      )}
    </div>
  );
};

export default MaterialToProduct;
