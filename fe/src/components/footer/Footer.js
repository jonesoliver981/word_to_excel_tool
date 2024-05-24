import React from "react";
import './Footer.css'
import { SocialIcon } from 'react-social-icons'

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
               <div>
               <SocialIcon url="https://www.facebook.com/travelobotofficial/" style={{ width: 30, height: 30, marginRight: 10 }} bgColor="#808080" />
                <SocialIcon url="https://www.twitter.com/" style={{ width: 30, height: 30, marginRight: 10 }} bgColor="#808080" />
                <SocialIcon url="https://www.linkdn.com/" style={{ width: 30, height: 30 }} bgColor="#808080" />
               </div>
           
            <span className="copy-right">&#169; Copyright 2024 - TRAVELOBOT LLC - 16192 Coastal Highway, Lewes, DE, US 19958 - All Rights Reserved.</span>
            </div>
        </div>


    )
}

export default Footer;
