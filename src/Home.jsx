import { useState } from 'react';
import ReactLogo from './assets/react.svg?react';
import ViteLogo from './assets/vite.svg?react';
import buttonIcon from './assets/button.png';
import menuIcon from './assets/menu_icon.jpg'
import typographyIcon from './assets/typography.png';
import MainMenu from './MainMenu.jsx';
import Showcase from './Showcase.jsx';
// import {formElements, menus, typography} from './links.jsx';
import * as links from './links.jsx';
import './Home.css';

import GlowButton from "./cmpntlib/Buttons/GlowButton/GlowButton.jsx";

function Home() {
    const [count, setCount] = useState(0);
    const [showcaseArea, setShowcaseArea] = useState(<>
    <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <ViteLogo></ViteLogo>
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <ReactLogo></ReactLogo>
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <div>
        <h2>Welcome to my component library</h2>
        <p>Click on this menu to explore the components in this library</p>
      </div>
      <div>
        <h2>Included in this project:</h2>
        <ul>
          <li><em>Vite-plugin-svgr</em> for svg components</li>
          <li><em>splitVendorChunkPlugin</em> for better cache optimization</li>
          <li><em>postcss</em></li>
          <li><em>autoprefixer</em> for better browser compatability</li>
          <li><em>eslint</em> for better code</li>
          <li><em>vitest + testing-library</em> for test automation</li>
          <li><em>PropTypes</em> learn why these are important <a href="https://www.youtube.com/watch?v=cx0S8JyiVxc">here</a> </li>
        </ul>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>);

    /* The callback function returns a component from the 'links' object back 
     * to the original component that hosts the menu component.  This allows 
     * components to be selected from a menu and displayed.  The callback must
     * be defined in the original hosting component that displays the menu (here).  
     * Then recursive menu componets pass it to the links file on each 
     * recursive iteration so that it will be available in each submenu */
    //This callback function definition is required for the menu component to work.
    const callback = (label="", description="", Input=null, props=null) => {
      setShowcaseArea(<Showcase label={label} description={description}><Input {...props}/></Showcase>);
    }
    


    return (
    <>
      <div id="library-main-menu">
        <div id="form-elements-menu" className="library-mmoption"><MainMenu links={links.formElements} icon={buttonIcon} callback={callback}/>Form Elements</div>
        <div id="menus-menu" className="library-mmoption"><MainMenu links={links.menus} icon={menuIcon} callback={callback}/>Menus</div>
        <div id="typography-menu" className="library-mmoption"><MainMenu links={links.typography} icon={typographyIcon} callback={callback}/>Typography</div>
      </div>

      {showcaseArea}
      
    </>
  )

}

export default Home;