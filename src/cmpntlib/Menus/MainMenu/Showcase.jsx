import { useState } from 'react';
import './Showcase.css';

function Showcase({label, description, children}) {
    return (
        <div id="showcase-area">
            <h1>Presenting:</h1>
            <h2>{label}</h2>
            <div id="showcase-component">
                {children}
            </div>
            <div id="showcase-description">
                {description}
            </div>
            
        </div>
    )

}

export default Showcase;