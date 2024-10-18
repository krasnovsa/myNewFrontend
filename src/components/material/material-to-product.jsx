import React, { useState, useEffect } from "react";
import {
  getMaterialProfileTypes,
  getMaterialById,
} from "../../api/apiMaterial";
import { getProductById } from "../../api/apiProduct";
import { isAuthenticated } from "../../auth/index";
import PriceHistory from "./material-price-history";
import MaterialSelectByParams from "./material-select-by-params/material-select-by-params";


const MaterialToProduct = ({ prodId }) => {
  const { user, token } = isAuthenticated();
  const [formData, setFormData] = useState({
    matId: 0,
    lenght: 0,
    resQttToOne: 1,
  });
  const [materialName, setMaterialName] = useState("");
  const [priceData, setPriceData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productData = await getProductById(user._id, token, prodId);
        console.log("Полученные данные о продукте:", productData);
        setFormData({
          matId: productData.matId || 0,
          lenght: productData.lenght || 0,
          resQttToOne: productData.resQttToOne || 1,
        });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
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
              value={formData.matId}
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
                value={formData.lenght}
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
          handleClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default MaterialToProduct;
