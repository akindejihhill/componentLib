import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './Menu.css';   //tempoorary, TODO: make a css file for this component
import { useState, useEffect, useRef } from 'react';


/**
 * This is the recursive component to a menu system that requires two components.
 * It requires the main menu component to start, and this recursive menu component 
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
 *   }
 *  ]
 *  
 *  For a large menu it is suggested 
 * to keep this data in a separate file that is imported and passed to the "links" prop.
 * 
 * @returns 
 */
const Menu = ({callback, links, handleBlur, y, menuOffset}) => {


    /* The callback function returns a component from the 'links' object back 
     * to the original component that hosts the menu component.  This allows 
     * components to be selected from a menu and displayed.  The callback must
     * be defined in the original hosting component that displays the menu.  
     * Then recursive menu componets (this one here) pass it to the links file 
     * on each recursive iteration so that it will be available in each submenu */
    links.func = callback;     /*passes the callback function to the links object
    that defines the contents of the menu.*/

    const pageHasRendered = useRef(false);
    const cssBorder = 5;

    // controls the visibility of the user menu for the logged-in user widget
    const [visibility, setVisibility] = useState(false);
    
    const [menu, setMenu] = useState(null);
    const [submenu, setSubmenu] = useState(null);

    //toggles the visibility of the menu
    function closeMenu (event){
        setSubmenu(null);
        setMenu(null);
        setVisibility(false); //triggers useEffect to rerender the page
    }

    //toggles the visibility of the menu
    function openSubmenu (data, index, event){
        setSubmenu(<Menu links={data.input} key={index+1000} y={event.pageY} menuOffset={y}/>);
        setVisibility(true); //triggers useEffect to rerender the page
        
    }


    // const handleBlur = (event) => {
    //     if (menuRef.current && !menuRef.current.contains(event.target)) {
    //         setVisibility(false);
    //     }
    //   };

    // useEffect(() => {
    //     document.addEventListener('click', handleBlur);
    //     return () => {document.removeEventListener('click', handleBlur)};
    // }, []);


    //listen for clicks
    useEffect(() => {
        document.addEventListener('click', handleBlur);
        return () => {document.removeEventListener('click', handleBlur)};
    }, []);

  
    //render the user menu after the visibility has been toggled
    //Note: once the menu is clicked on it steals the menuRef from the user button, so that the "handleOnBlur" function works with the menu instead.
    useEffect(()=>{
        //if(pageHasRendered.current){
            setMenu(
                <div role="menu" className="submenu-left" style={{top : `${y - menuOffset - cssBorder}px`}}>
                {/* <div role="menu" className="submenu-left" > */}
                    {
                        links.data.map((data, index) => {
                            if (data.role === 'menuitem'){
                                return (<p key={index} role="menuitem" className="menuitem"><Link to={data.input} onClick={closeMenu}>{data.title}</Link></p>)
                            }  else if (data.role === 'menu'){
                                return (<div className="menulink-group">
                                    <span className="menufronticon"></span><span className="menulink" key={index} role="menu" onClick={(event)=>{openSubmenu(data, index, event)}}><a>{data.title}</a></span><span className="menurearicon"></span>
                                </div>)
                            } else if (data.role === 'function'){
                                return (<p key={index} role="menuitem" className="menuitem"><a onClick={(evt)=>{closeMenu(evt) ; data.input();}}>{data.title}</a></p>)
                            } else if (data.role === 'callback'){
                                /*The links.funk onClick function here defines the parameters of the callback function 
                                 *required to pass a component into the main page as configured in the links object.
                                 *So, you probably don't want to alter that unless you are refactoring the code */
                                return (<p key={index} role="menuitem" className="menuitem"><a onClick={(evt)=>{closeMenu(evt) ; links.func(data.title, data.description, data.input, data.props);}}>{data.title}</a></p>)
                            } else return (<p key={index}>Error: unsupported role "{link.role}"</p>)                            
                        })
                    }
                    {submenu} 
                </div> 
            );
        //}
        //pageHasRendered.current = true;

    },[visibility]);


    return (<>
        {menu}
    </>);
}


Menu.propTypes = {
    links : PropTypes.object
}

export default Menu;
