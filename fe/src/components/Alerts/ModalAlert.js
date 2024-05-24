

import React from "react";
import './ModalAlert.css';




const ModalAlert =({onSubmit,onCancel,onClose ,children})=>{



  
  return(
    <div  className="modal-container">
      <div className="modal">
        <div className="modal-header">
          <button className="close" onClick={onClose}>&times;</button>
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