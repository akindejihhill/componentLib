import { useState } from 'react';
import menuIcon from './menuicon.png'
import MainMenu from './MainMenu.jsx';
import Showcase from './Showcase.jsx';
import * as links from './links.jsx';
import './Page.css';

function Page() {
    const [count, setCount] = useState(0);
    const [showcaseArea, setShowcaseArea] = useState(<>
    <div>
        <p>If you select a component from the menu, it will display here.</p>
    </div>   
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
      <div id="main-menu">
        <div className="mmoption"><MainMenu links={links.menuLinks} icon={menuIcon} callback={callback}/>Menu</div>
      </div>

      {showcaseArea}
      
    </>
  )

}

export default Page;