# Template for component library

This is a sample component library that can be expanded and then used for your react projects.

* Create/modify components in the folders under src/cmpntlib
* Register any components you create in the src/cmpntlib/index.jsx file, by importing them and adding their name to the export line in that file.  Just follow the pattern of the sample components that are already in there.
* build the library ``$ npm run build``
* Go to the project that will use this library and install this library
    ``$ npm i [fullPathToLibraryProjectFolder]``
* In your project code, import the components you want to use from the component library.  For example
    ```javascript
    import {GlowButton} from 'componentlib';
    ```

Using a UI component library like this allows you to amass a large personal library of UI components to use in your projects that you can select from, without bundling ALL of components including ones you don't need for your project.

Happy creating!


## Authorship
Technically typed by me, Akindeji Hill, but under the tutalage of an instructor.  See Attribution.


## Attribution
I made this following a tutorial from a course on the Vite Bunder by Gaurav Soni.  I recommend this quick 4 hour course for learning how to use Vite to create front end apps using the React library.  You will come away with a very good intermediate understanding of Vite as well as how to build a react app from scratch or using a template.

https://github.com/gauravsoni1

https://www.udemy.com/course/build-fast-modern-webapp-with-vite-js-bundler/ 


## Sharing
I made this primarily just so that I can use it, and storing it on github is just so I don't lose it as my past data and personal projects have had a terrible relationship with hard drives.  However anybody can use it in their projects for any reason, as long as the Authorship and Attribution stay intact with this library, and you don't try to copywrite it to prevent others from using it.  I mean, it's not very unique anyway, it's pretty boilerplate.