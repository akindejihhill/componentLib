import { useState } from 'react';
import './Showcase.css';

function Showcase({label, description, children}) {
    return (
        <div id="library-showcase-area">
            <h1>Presenting:</h1>
            <h2>{label}</h2>
            <div id="library-showcase-component">
                {children}
            </div>
            <div id="library-showcase-description">
                {description}
            </div>
            
        </div>
    )

}

export default Showcase;