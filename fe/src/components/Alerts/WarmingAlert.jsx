import React from 'react';
import './WarmingAlert.css';

const WarmingAlert = ({ message }) => {
    return (
        <div className="alert-message-box warning-alert ">
            <span className="alert-icon">&#9888;</span> {/* Info symbol */}
            <span className="alert-message">{message}</span>
        </div>
    );
};

export default WarmingAlert;
