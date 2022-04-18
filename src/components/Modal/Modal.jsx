import React, { useEffect } from "react";
import "./modal.css";
const Modal = ({ show, setShowModal, children }) => {
  useEffect(() => {
    document.getElementById("modal-content").scrollTo(0, 0);
  }, [show]);
  return (
    <div className={show ? "modal-container active" : "modal-container"}>
      <div className="modal1" onClick={setShowModal}></div>
      <div className="modal-content">
        <div className="content" id="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
