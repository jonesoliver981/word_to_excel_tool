import React from 'react';
import './SuccessAlert.css';

const SuccessAlert = ({ message }) => {
    return (
        <div className="alert-message-box success-alert">
            <span className="alert-icon">&#10004;</span>
            <span className="alert-message">{message}</span>
        </div>
    );
};

export default SuccessAlert;
