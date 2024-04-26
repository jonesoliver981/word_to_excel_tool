import React from "react";
import './Footer.css'
import { SocialIcon } from 'react-social-icons'

const Footer = () => {
    return (
        <div>
        <div className="footer-container">
            <SocialIcon url="https://www.facebook.com/" style={{ width: 30, height: 30, marginRight: 10 }} bgColor="#808080" />
            <SocialIcon url="https://www.twitter.com/" style={{ width: 30, height: 30, marginRight: 10 }} bgColor="#808080" />
            <SocialIcon url="https://www.linkdn.com/" style={{ width: 30, height: 30 }} bgColor="#808080" />
        </div>
            <diV>
            <span className="copy-right">&#169; Travel Bot 2024. All Rights Reserved.  Privacy Policy | Terms of Service | Contacts </span>
            </diV>
        </div>
        
    )
}

export default Footer;
