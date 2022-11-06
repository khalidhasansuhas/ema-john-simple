/**
 * AUTH SETUP
 1. create a firebase project
 2. enable web
 3. enable sign in method
 4. install firebase
 5. get firebase config in your firebase.config.js file
 6. export app from firebase.config.js

 */

 /**
  1. Create UserContext (Auth Context)---> component name
  userContext provides AuthContext

  2. create AuthConext
  3. set AuthContext.Provider
  4. make sure you set the children
  5. export AuthContext to be used inside useContext hook
  6. get form data
  7.getAuth in the userContext
  */

  /**
   * FIREBASE HOSTING
   * 
   //one time for each computer
   1. npm install -g firebase-tools
   2. firebase login

   // for each project
   3. firebase init
   makesure: for public direactory you select: build
   single page application: y
   github deploy : n

   //for every deploy

   4. npm run build
   5. firebase deploy
   */