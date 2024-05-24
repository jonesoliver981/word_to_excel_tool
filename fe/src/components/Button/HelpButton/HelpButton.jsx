// import React, { useState } from "react";
// import '../HelpButton/HelpButton.css';
// import { RiArrowDropDownLine } from "react-icons/ri";
// import { useNavigate } from "react-router-dom";

// const HelpButton = () => {
//     const [showToggle, setShowToggle] = useState(false);
//     const [showDropdownIcon, setShowDropdownIcon] = useState(true);
//     const navigate = useNavigate();

//     const toggleDropDown = () => {
//         setShowToggle(!showToggle);
//         setShowDropdownIcon(!showDropdownIcon)
//     };

//     return (
//         <div className="help-button"> 
//             <div className="help-container">
//                 <button onClick={toggleDropDown}>Help</button>
//                 {showDropdownIcon &&(
//                 <RiArrowDropDownLine className="drop-down-symbol" onClick={toggleDropDown} />)}
//                 {showToggle && (
//                     <select onChange={(e) => navigate(e.target.value)}>
//                         {/* <option value="">Select an option</option> */}
//                         <option value="/create">Create</option>
//                     </select>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default HelpButton;
import React, { useState, useEffect, useRef } from "react";
import '../HelpButton/HelpButton.css';
import { useNavigate } from "react-router-dom";
import { LuMenuSquare } from "react-icons/lu";

const HelpDropdown = () => {
    const [showToggle, setShowToggle] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowToggle(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropDown = () => {
        setShowToggle(!showToggle);
    };

    const handleOptionClick = (route) => {
        navigate(route);
        setShowToggle(false);
    };

    return (
        <div className="dropdown help-button" ref={dropdownRef}> 
            <button onClick={toggleDropDown} className="dropbtn">Category-Menu</button>
            <LuMenuSquare onClick={toggleDropDown} className="menu-icon"/>
            <div id="myDropdown" className={`dropdown-content ${showToggle ? 'show' : ''}`}>
                <a href="" onClick={() => handleOptionClick("/create")}>Create</a>
                <a href="" onClick={() => handleOptionClick("/update")}>Update</a>
                <a href="" onClick={() => handleOptionClick("/delete")}>Delete</a>
            </div>
        </div>
    );
};

export default HelpDropdown;
