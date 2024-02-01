
/*
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
 * */

import GlowButton from "./cmpntlib/Buttons/GlowButton/GlowButton.jsx";
import IconButton from "./cmpntlib/Buttons/IconBtn/IconButton.jsx";
import iconButtonIcon from "./assets/react.svg"
import RoundedButton from "./cmpntlib/Buttons/RoundedButton/RoundedButton.jsx"

const callback = {func : ()=>{throw Error ("A callback method was specified but not provided to a menu set")}}

const formElements = {  func : callback.func,
                        data : [{
                            role : 'menu',
                            title: 'buttons',
                            input: {func : callback.func,
                                        data : [{
                                                    role:'callback',
                                                    title:'GlowButton',
                                                    input: GlowButton,
                                                    props: {label : "Hover me then click me!"},
                                                    description: "A button with a neat effect"
                                                },
                                                {
                                                    role:'callback',
                                                    title:'IconButton',
                                                    input: IconButton,
                                                    props: {label : "A button label!",
                                                            icon : iconButtonIcon
                                                        },
                                                    description: "A button component that you can pass an image and a label to"
                                                },
                                                {
                                                    role:'callback',
                                                    title:'RoundedButton',
                                                    input: RoundedButton,
                                                    props: {label : "Look at me, I'm rounded!"},
                                                    description: "A round button component.  That's it.  What did you expect?"
                                                }]
                                    },

                        },
                        {
                            role:'callback',
                            title:'GlowButton',
                            input: GlowButton,
                            props: {label : "Hover me then click me!"},
                            description: "A button with a neat effect"                 
                        }
                    ],


}





                    


import HoverText from './cmpntlib/Typography/HoverText/HoverText.jsx'
import Sliced from './cmpntlib/Typography/Sliced/Sliced.jsx'

const typography =  {func : callback,
                        data : [{
                                role:'callback',
                                title:'HoverText',
                                input: HoverText,
                                props: {label : "Hover Text!"},
                                description: "Some text that does stuff when the mouse hovers over it"
                            },
                            {
                                role:'callback',
                                title:'Sliced',
                                input: Sliced,
                                props: {label : "Sliced Text!"},
                                description: "Some text that is sliced"
                            }
                    ]

}


import Page from './cmpntlib/Menus/MainMenu/Page.jsx' 
import * as links from './cmpntlib/Menus/MainMenu/links.jsx'
import menuIcon from './cmpntlib/Menus/MainMenu/menuicon.png'

const menus =   {func : callback,
                data : [{
                            role:'callback',
                            title:'MainMenu',
                            input: Page,
                            props: {links : links.menuLinks, icon : menuIcon},
                            description: (
                                <p>This component allows you to create a recursive menu just by adding items to an object.  This library is organized with this very menu system"</p>
                            )
                        }
                ]

}





export {callback, formElements, menus, typography};