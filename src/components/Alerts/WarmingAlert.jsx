import React from 'react';
import './WarmingAlert.css';

const WarmingAlert = ({ message }) => {
    return (
        <div className="warning-alert ">
            <span className="warning-icon">&#9888;</span> {/* Info symbol */}
            <span className="alert-message">{message}</span>
        </div>
    );
};

export default WarmingAlert;
