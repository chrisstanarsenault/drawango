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
  import MobileMainView from './mobileMainView';
  import DesktopMainView from './desktopMainView';


  class App extends Component {
    render() {
      return (
        <Fragment>
          <h3 style={{ textAlign: 'center' }}>Draw Daddy</h3>
        <BrowserView>
          <DesktopMainView/>
        </BrowserView>
        <MobileView>
          <MobileMainView/>
        </MobileView>
          {/* <div className="main">
            <div className="color-guide">
              <h5>Color Guide</h5>
              <div className="user user">User</div>
              <div className="user guest">Guest</div>
            </div>
            <Canvas />
          </div> */}
        </Fragment>
      );
    }
  }
  export default App;
