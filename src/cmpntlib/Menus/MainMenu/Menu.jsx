import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './Menu.css';   //tempoorary, TODO: make a css file for this component
import { useState, useEffect, useRef } from 'react';


/**
 * This is the recursive component to a menu system that requires two components.
 * It requires the main menu component to start, and this recursive menu component 
 * to create the submenues.
 * 
 * @param links, a list of objects describing a link.  Each link object has two main properties:
 * 1) func, which is a place to store a callback function that handles displaying any components 
 * listed in the menu. 
 * 2) data, has three madatory keys, *role*, *title*, and *input*, and two optional keys
 *    *props* and *destription* only nessesary if the menu item is a prop.
 * 
 * *role*, is either 'menuitem', 'menu', 'function', or 'callback'.  
 *   * A menuitem will expect a path to be provided as input.  
 *   * A menu will expect a nested links list object to be provided (complete with its own func and data properties) as input to 
 *   *  create submenus.  
 *   * A function item will expect a function to be provided as input that will be attached to the submenu's onClick event handler. 
 *   *  This allows for things like a 'logout' and 'save' buttons or buttons to play sounds or do other things that you can imagine.
 *   * A callback item sends a component back to the original component that hosts the menu.  It requires two additional properties
 *   * to be included,  'props' and 'description'
 * 
 * *title* is the text that will be displayed for the menu item.
 *  
 * *input* is one of three things depending on the role type.
 *   1) a path to a document 
 *   2) a nested submenu
 *   3) a component.  The component needs to be previousely imported from a component module
 * 
 * *props* is required for callback menuitems.  It allows you to pass any props that are expected by the component.  Assign an 
 *  object to this property with prop names and prop values 
 * 
 * *description* sends information to be displayed along with the component within the Showcase component It can
 *  be a text description of the component being displayed, or maybe even an object or html.  This
 *  is javascript after all so send whatever type of data through that you want to display.
 * 
 * The example shows a menu with a nested submenu called "Offices".  "New York" and 'Los Angeles'.  It 
 * also has two top level menuitems called "Products" and "Services".
 * 
 * Example: 
 * 
 *  const callback = {func : ()=>{throw Error ("A callback method was specified but not provided to a menu set")}}

    const menuLinks = {
        func:   callback.func
        data:   [
            {
                role :  'menu', 
                title:  'Offices', 
                input : { func :    callback.func,
                          data :[   
                                    {
                                        role : 'menuitem', 
                                        title : 'New York', 
                                        input : '/newyorkoffice'
                                    }, 
                                    {
                                        role : 'menuitem, 
                                        title : 'Los Angeles', 
                                        input : '/laoffice}]
                                    }
                                    {
                                        role  : 'callback',
                                        title : 'National Map',
                                        input : MapComponent,
                                        props : {   logo : logoObject,
                                                    location : ["37.4419 n", "122.1430 w"]                                                
                                        },
                                        description: "A special time limited impuse offer just for you!"

                                    },
                                ]
            },
            {
                role : 'menuitem',
                title: 'Products',
                input: '/productspage'
            },
            {
                role : 'menuitem',
                title: 'Services',
                input: '/servicespage'
            }
            {
                role  : 'callback',
                title : 'Special Offer',
                input : SpecialOffer,
                props : {   logo : logoObject,
                            name : "Mark Suckerberg"
                        
                },
                description: "A special time limited impuse offer just for you!"

            },
            {
                role : 'function',
                title: 'sign out',
                input: logout
            }
        ]
 *  
 *  For a large menu it is suggested 
 * to keep this data in a separate file that is imported and passed to the "links" prop.
 * 
 * @returns 
 */
const Menu = ({links, callback, handleBlur, parentKey, y, menuOffset}) => {


    /* The callback function returns a component from the 'links' object back 
     * to the original component that hosts the menu component.  This allows 
     * components to be selected from a menu and displayed.  The callback must
     * be defined in the original hosting component that displays the menu.  
     * Then recursive menu componets (this one here) pass it to the links file 
     * on each recursive iteration so that it will be available in each submenu */
    links.func = callback;     /*passes the callback function to the links object
    that defines the contents of the menu.*/

    const menuRef = useRef(null);
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
        setSubmenu(<Menu links={data.input} key={index+parentKey+1000} parentKey={index+parentKey+1000} y={event.pageY} menuOffset={y}/>);
        setVisibility(true); //triggers useEffect to rerender the page
        console.log("Opening submenu: ", index+parentKey+1000);

        
    }


    // const handleBlur = (event) => {
    //     if (menuRef.current && !menuRef.current.contains(event.target)) {
    //         setVisibility(false);
    //         closeMenu(event);
    //     }
    //   };

    // const handleBlur = (event) => {
    //     if (menuRef.current && !menuRef.current.contains(event.target)) {

    //         setVisibility(false);
    //     }

    //     if(event.target.parentElement.className === "menuitem"){
    //         setVisibility(false);
    //         setMenu(null);
    //     }
    // };


    //listen for clicks
    useEffect(() => {
        document.addEventListener('click', handleBlur);
        return () => {document.removeEventListener('click', handleBlur)};
    }, []);

  
    //render the user menu after the visibility has been toggled
    //Note: once the menu is clicked on it steals the menuRef from the user button, so that the "handleOnBlur" function works with the menu instead.
    useEffect(()=>{
        //if(pageHasRendered.current){
            console.log("setting menu");
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

    },[visibility, submenu]);


    return (<>
        {menu}
    </>);
}


Menu.propTypes = {
    links : PropTypes.object
}

export default Menu;
