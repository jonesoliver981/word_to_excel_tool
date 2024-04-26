import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './DeleteButton.css';


const DeleteButton = ({ onClick }) => {
    return (
        <button className="delete-icon" onClick={onClick}>
            <FontAwesomeIcon icon={faTrash} />  
        </button>
    );
}

export default DeleteButton;


