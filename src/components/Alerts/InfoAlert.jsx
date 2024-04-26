import React from 'react';
import './InfoAlert.css';

const InfoAlert = ({ message }) => {
    return (
        <div className="info-alert">
            <span className="info-icon">&#8505;</span> {/* Info symbol */}
            <span className="alert-message">{message}</span>
        </div>
    );
};

export default InfoAlert;
