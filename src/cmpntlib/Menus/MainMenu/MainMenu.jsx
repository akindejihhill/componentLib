import PropTypes from 'prop-types';
import {Link, useNavigate} from 'react-router-dom';
import './Menu.css';
import { useState, useEffect, useRef } from 'react';
import Menu from './Menu.jsx';

/**
/**
 * This is the main menu component to a menu system that requires two components.
 * It requires this main menu component to start, and a recursive menu component 
 * to create the submenues.
 * 
 * @param links, a list of objects describing a link.  Each link object has three mandatory keys, 
 * *role*, *title*, and *input*.
 * 
 * *role*, is either 'menuitem', 'menu', or 'function'.  A menuitem will expect a path to be provided as input.  A 
 *  menu will expect a nested links list to be provided as input to create submenus.  A function item will expect 
 *  a function to be provided as input that will be attached to the submenu's onClick event handler. This allows 
 *  for things like a 'logout' and 'save' buttons or buttons to play sounds or do other things that you can imagine.
 * 
 * *title* is the text that will be displayed for the menu item.
 *  
 * *input* is either a path to a document or a nested submenu
 * 
 * The example shows a menu with a nested submenu called "Offices".  "New York" and 'Los Angeles'.  It 
 * also has two top level menuitems called "Products" and "Services".
 * 
 * Example: 
 * [{
 *   role : 'menu', 
 *   title: 'Offices', 
 *   input : [{
 *            role : 'menuitem', 
 *            title : 'New York', 
 *            input : '/newyorkoffice'
 *           }, 
 *           {
 *            role : 'menuitem, 
 *            title : 'Los Angeles', 
 *            input : '/laoffice}]
 *           }]
 *   },
 *   {
 *    role : 'menuitem',
 *    title: 'Products',
 *    input: '/productspage'
 *   },
 *   {
 *    role : 'menuitem',
 *    title: 'Services',
 *    input: '/servicespage'
 *   }
 *   {
 *    role : 'function',
 *    title: 'sign out',
 *    input: logout
 *    }
 *  ]
 *  For a large menu it is suggested 
 * to keep this data in a separate file that is imported and passed to the "links" prop.
 * 
 * @param icon, the picture to use for the menu button
 * @returns 
 */
const MainMenu = ({callback, links, icon}) => {

    /* The callback function returns a component from the 'links' object back 
     * to the original component that hosts the menu component.  This allows 
     * components to be selected from a menu and displayed.  The callback must
     * be defined in the original hosting component that displays the menu.  
     * Then recursive menu componets (this one here) pass it to the links file 
     * on each recursive iteration so that it will be available in each submenu */
    links.func = callback;     /*passes the callback function to the links object
    that defines the contents of the menu.*/

    const menuOffset = 580;
    const menuRef = useRef(null);
    const pageHasRendered = useRef(false);
    const navigate = useNavigate();

    // controls the visibility of the user menu for the logged-in user widget
    const [uMVisibility, setUMVisibility] = useState(false);

    // controls the visibility of the sub menu for the logged-in user widget
    const [sMVisibility, setSMVisibility] = useState(false);
    
    const menuButton = (
        <div id="menu-button" tabIndex="1" onClick={toggleMainMenu}>
            <img className="menu-icon" src={icon} alt="Buttons"/>
        </div>
    );

    const [mainMenu, setMainMenu] = useState(null);
    const [submenu, setSubmenu] = useState(null);

    const handleBlur = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setUMVisibility(false);
        }

        if(event.target.parentElement.className === "menuitem"){
            setUMVisibility(false);
            setMainMenu(null);
        }
    };


    //toggles the visibility of the user menu
    function toggleMainMenu (evt){
        setUMVisibility(visibility=>!visibility);
        setSMVisibility(false);
        setSubmenu(null);
        menuRef.current = evt.target;
    }

    function toggleSubmenu(data, index, event){
        setSubmenu(<Menu callback={callback} links={data.input} key={index+1000} handleBlur={handleBlur} y={event.pageY} menuOffset={menuOffset}/>);
        setSMVisibility(visibility=>!visibility); //triggers useEffect to rerender the page        
    }


    //listen for clicks
    useEffect(() => {
        document.addEventListener('click', handleBlur);
        return () => {document.removeEventListener('click', handleBlur)};
    }, []);


    //render the user menu after the visibility has been toggled
    //Note: once the menu is clicked on it steals the menuRef from the user button, so that the "handleOnBlur" function works with the menu instead.
    useEffect(()=>{
        if(pageHasRendered.current){
            if(uMVisibility){
                setMainMenu(
                    <div role="menu" className="main-menu" onClick={(evt)=>{menuRef.current = evt.target;}}>
                        {
                            links.data.map((data, index) => {
                                if (data.role === 'menuitem'){
                                    return (<p key={index} role="menuitem" className="menuitem"><Link to={data.input} onClick={(evt)=>{setUMVisibility(false); setSMVisibility(false)}}>{data.title}</Link></p>)
                                } else if (data.role === 'menu'){
                                    return (<div className="menulink-group">
                                                <span className="menufronticon"></span><span className="menulink" key={index} role="menu"  onClick={(event)=>{toggleSubmenu(data, index, event)}}><a>{data.title}</a></span><span className="menurearicon"></span>
                                            </div>
                                        )
                                } else if (data.role === 'function'){
                                    return (<p key={index} role='menuitem' className="menuitem"><a onClick={(evt)=>{setUMVisibility(false); setSMVisibility(false); data.input();}}>{data.title}</a></p>)
                                } else if (data.role === 'callback'){
                                        /*The links.funk onClick function here defines the parameters of the callback function 
                                         *required to pass a component into the main page as configured in the links object.
                                         *So, you probably don't want to alter that unless you are refactoring the code */
                                        return (<p key={index} role="menuitem" className="menuitem"><a onClick={(evt)=>{setUMVisibility(false); setSMVisibility(false) ; links.func(data.title, data.description, data.input, data.props);}}>{data.title}</a></p>)
                                } else return (<p key={index}>Error: unsupported role "{data.role}"</p>)
                            })
                        }
                        {submenu}       
                    </div> 
                );
            } else {
                setMainMenu(null);
            }
        }
        pageHasRendered.current = true;

    },[uMVisibility, sMVisibility]);

    return (<>
            {menuButton}
            {mainMenu}
        </>);
}


MainMenu.propTypes = {
    links : PropTypes.object,
    loginPage : PropTypes.string,
    user : PropTypes.object,
    updateUser : PropTypes.func
}

export default MainMenu;
