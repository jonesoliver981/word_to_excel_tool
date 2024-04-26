import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import './AddButton.css'
// import { faMyIcon } from '@awesome.me/kit-KIT_CODE/icons/kit/custom'

const AddButton = ({ onClick }) => {
    return (
        <button className="add-button easybutton1" onClick={onClick}>
            {/* <FontAwesomeIcon icon="fa-duotone fa-circle-plus" /> */}
            <FontAwesomeIcon icon={faCirclePlus} />

        </button>
    );
}

export default AddButton;

