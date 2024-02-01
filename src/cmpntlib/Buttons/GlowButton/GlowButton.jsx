import React from "react";
import './GlowButton.css';

const GlowButton = ({label}) => {
    return (
        <button className="glow-on-hover" type="button">{label}</button>
    )

}

export default GlowButton;