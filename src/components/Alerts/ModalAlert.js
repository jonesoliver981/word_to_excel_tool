// import React from 'react';
// import Modal from 'react-bootstrap-modal';

// const ModalAlert = ({ show, onClose, onConfirm }) => {
//     const handleConfirm = () => {
//         onConfirm(); // Call the onConfirm function passed from the parent component
//         onClose(); // Close the modal
//     };

//     return (
//         <Modal show={show} onHide={onClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Reset Category</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>Are you sure you want to reset the category?</Modal.Body>
//             <Modal.Footer>
//                 <button onClick={onClose}>No</button>
//                 <button onClick={handleConfirm}>Yes</button>
//             </Modal.Footer>
//         </Modal>
//     );
// };

// export default ModalAlert;

import React from "react";
import './ModalAlert.css';




const ModalAlert =({onSubmit,onCancel,onClose ,children})=>{



  
  return(
    <div id='warning-modal' className="modal-container">
      <div className="modal">
        <div className="modal-header">
          <p className="close" onClick={onClose}>&times;</p>
        </div>
        <div className="modal-content">
          <h1>{children}</h1>
        </div>
        <div className="modal-footer">
          <button className="btn btn-yes" onClick={onSubmit}>Yes</button>
          <button className="btn btn-no" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  )
}


export default ModalAlert;