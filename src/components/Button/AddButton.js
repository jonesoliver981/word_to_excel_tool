import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import './AddButton.css'


const AddButton = ({ onClick }) => {
    return (
        <button className="add-button easybutton1" onClick={onClick}>
            <FontAwesomeIcon icon={faCirclePlus} />

        </button>
    );
}

export default AddButton;

