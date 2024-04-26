import React from 'react';
import './ErrorAlert.css';

const ErrorAlert = ({ message }) => {
    return (
        <div className="error-alert">
            <span className="x-icon">&#10006;</span>
            <span className="alert-message">{message}</span>
        </div>
    );
};

export default ErrorAlert;
