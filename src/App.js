   // App.js

   import React, { Component, Fragment } from 'react';
   import './App.css';
   import Canvas from './canvas';
   import {
      BrowserView,
      MobileView,
      isBrowser,
      isMobile
    } from "react-device-detect";

   class App extends Component {
     render() {
       return (
         <Fragment>
           <h3 style={{ textAlign: 'center' }}>Draw Daddy</h3>
           <BrowserView>
          <h1> This is rendered only in browser </h1>
          </BrowserView>
          <MobileView>
            <h1> This is rendered only on mobile </h1>
          </MobileView>
           <div className="main">
             <Canvas />
           </div>
         </Fragment>
       );
     }
   }
   export default App;
