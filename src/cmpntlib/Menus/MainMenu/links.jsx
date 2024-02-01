
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
const callback = {func : ()=>{throw Error ("A callback method was specified but not provided to a menu set")}}

const menuLinks = {
                    func : callback.func,
                    data : [{
                                role:'menu',
                                title:'Test Menu 01',
                                input: {
                                            func: callback.func,
                                            data : [{
                                                role:'menu',
                                                title: 'Test Menu 01a',
                                                input:  {
                                                            func : callback.func,
                                                            data : [{
                                                                        role : 'function',
                                                                        title: "alert",
                                                                        input: ()=>{alert("Boo!")}
                                                                    },
                                                                    {
                                                                        role : 'function',
                                                                        title: "alert",
                                                                        input: ()=>{alert("BANG!")}
                                                            }]
                                                }
                                            },
                                            {
                                                role:'menu',
                                                title: 'Test Menu 01b',
                                                input: {
                                                        func : callback.func,
                                                        data : [{
                                                                    role : 'function',
                                                                    title: "alert",
                                                                    input: ()=>{alert("Zinger!")}
                                                                },
                                                                {
                                                                    role : 'function',
                                                                    title: "alert",
                                                                    input: ()=>{alert("TZZZ ZZZ!")}
                                                        }]
                                                }
                                            }]
                                        }                                
                                        
                            },
                            {
                                role : 'function',
                                title: "alert",
                                input: ()=>{alert("SHAZAM!")}
                            },
                            {
                                role : 'function',
                                title: "alert",
                                input: ()=>{alert("WAZA!")}
                            }

                    ]
}


export {menuLinks};
