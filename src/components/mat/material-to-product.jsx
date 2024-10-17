import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MaterialForm = () => {
  const [formData, setFormData] = useState({
    material: '',
    profile: '',
    diameter: 10,
    length: 0,
    quantity: 1,
  });
  const [priceData, setPriceData] = useState([
    { date: '09.07.2024', materialPrice: '700,00 ₽', totalPrice: '7,70 ₽' },
    { date: '30.05.2024', materialPrice: '700,00 ₽', totalPrice: '7,70 ₽' },
    { date: '23.03.2023', materialPrice: '700,00 ₽', totalPrice: '7,70 ₽' },
    { date: '25.02.2023', materialPrice: '700,00 ₽', totalPrice: '7,70 ₽' },
  ]);

  useEffect(() => {
    // Recalculate mass, total price, etc., when inputs change
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Save the current data
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6" style={{  fontSize: "12px" }}>
          <div className="mb-3">
            <label htmlFor="material" className="form-label">Материал</label>
            <select id="material" name="material" className="form-select" value={formData.material} onChange={handleInputChange}>
              {/* Populate material options */}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="profile" className="form-label">Профиль</label>
            <select id="profile" name="profile" className="form-select" value={formData.profile} onChange={handleInputChange}>
              {/* Populate profile options */}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="diameter" className="form-label">Диаметр, мм</label>
            <input
              type="number"
              id="diameter"
              name="diameter"
              className="form-control"
              value={formData.diameter}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="length" className="form-label">Длина заготовки</label>
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
            <label htmlFor="quantity" className="form-label">Количество на деталь</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              className="form-control"
              value={formData.quantity}
              onChange={handleInputChange}
            />
          </div>

          <button className="btn btn-primary" onClick={handleSave}>Записать</button>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">История цен</h5>
              <div className="table-responsive">
                <table className="table table-bordered table-hover" style={{ tableLayout: "auto", width: "100%" }}>
                  <thead>
                    <tr>
                      <th style={{  width: "100px" }}>Дата</th>
                      <th style={{  width: "100px" }}>Цена Мат</th>
                      <th style={{  width: "auto" }}>ЦенаЗаг</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.date}</td>
                        <td>{item.materialPrice}</td>
                        <td>{item.totalPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialForm;