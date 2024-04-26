import React from 'react';
import './SuccessAlert.css';

const SuccessAlert = ({ message }) => {
    return (
        <div className="success-alert">
            <span className="tick-icon">&#10004;</span>
            <span className="alert-message">{message}</span>
        </div>
    );
};

export default SuccessAlert;
