import React from 'react';
import './ErrorAlert.css';

const ErrorAlert = ({ message }) => {
    return (
        <div className="alert-message-box error-alert">
            <span className="alert-icon">&#10006;</span>
            <span className="alert-message">{message}</span>
        </div>
    );
};

export default ErrorAlert;
