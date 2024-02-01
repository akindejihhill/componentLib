import React from "react";
import "./IconButton.css";
import ErrorIcon from "./error_icon.png";

const IconButton = ({ label = "Error", icon = ErrorIcon }) => {
    return (
        <button type="button" className="icn-btn">
            <img src={icon} alt="icon" />
            {label}
        </button>
    )

}

export default IconButton;