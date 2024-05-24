import React from "react";
import { Link, useLocation } from "react-router-dom";
import './header.css'
// import '../../responsive.css'; 
const Header = ( ) => {
    const location = useLocation();
    const getHeaderTitle = () => {
        switch (location.pathname) {
          case '/create':
            return 'Add New Category and Sub Category';
          case '/update':
            return 'Update Category and Sub Category';
          case '/add-category':
            return 'Create Category';
          case '/add-sub-category':
            return 'Create Sub Category'
            
          default:
            return 'Convert WORD to EXCEL';
        }
      };
    

    return(
        <div className="header-container">
        <div className="container">
        <Link to="/" className="logo-link"><img src="/Picture_travel.png" alt="travel_bot" className="logo" /></Link>
            
            <h1 className="headers-content ">{getHeaderTitle()}</h1>
        </div>
        </div>
    )
}

export default Header;