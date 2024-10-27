import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import TpListForm from "../tp-list-form/tp-list-form";
import TpAddForm from "../tp-add-form/tp-add-form";
import AttViewer from "../../attachments/att-viewer/att-viewer"; // Импортируем компонент AttViewer
import "./styles.css"; // Импортируем стили

const TpCreateEdit = ({ prodId }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setModalIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
  }, []);

  return (
    <div>
      <button className="btn btn-primary" onClick={openModal}>
        Создать/Редактировать техпроцесс
      </button>
      {modalIsOpen && (
        <div className="popup">
          <div className="popup-inner">
            <button type="button" className="close" onClick={closeModal}>
              &times;
            </button>
            <h5>Создание/Редактирование техпроцесса</h5>
            <div className="modal-body">
              <div className="grid-item-left">
                <TpAddForm />
                <TpListForm prodId={prodId} />
              </div>
              <div className="grid-item-right">
                <AttViewer tableName="Products" keyValue={prodId} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModal}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

TpCreateEdit.propTypes = {
  prodId: PropTypes.number.isRequired,
};

export default TpCreateEdit;
