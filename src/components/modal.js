import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const MyModal = ({
  onCancel,
  onOk,
  onShow,
  showOk = true,
  showCancel = true,
  modalHeader = "this is modalHeader",
  modalBody = "this is modalBody",
  buttonCaption = "modal button",
  buttonClasses = "btn btn-outline-primary mt-2  mb-2 mr-2",
  okCaption = "OK",
  cancelCaption = "Cancel",
  initModalShow = false,
  showButton=true,
  
}) => {
  const [show, setShow] = useState(false);
  const handleCloseOk = () => {
    setShow(false);
    console.log("click Ok");
    onOk();
  };
  const handleCloseCancel = () => {
    setShow(false);
    console.log("click Cancel");
    onCancel();
  };

  useEffect(() => {
    if (initModalShow) {
      setShow(true);
    }
  }, []);

  const handleShow = () => {
    setShow(true)
    if (typeof onShow === 'function') {onShow()}
  };

  return (
    <div style={{ display: "inline-block" }}>

      <div className={buttonClasses} onClick={handleShow}>
        {buttonCaption}
      </div>

      <Modal show={show} onHide={handleCloseCancel}>
        <Modal.Header closeButton>
          <Modal.Title>{modalHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          {showCancel && (
            <Button variant="secondary" onClick={handleCloseCancel}>
              {cancelCaption}
            </Button>
          )}
          {showOk && (
            <Button variant="primary" onClick={handleCloseOk}>
              {okCaption}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default MyModal;
