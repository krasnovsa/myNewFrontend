import React from "react";

const PriceHistory = ({ priceData }) => {

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">История цен</h5>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th style={{ width: "100px" }}>Дата</th>
                <th style={{ width: "100px" }}>Цена Мат</th>
                <th>ЦенаЗаг</th>
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
  );
};

export default PriceHistory;
