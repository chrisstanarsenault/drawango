import React, { Component } from 'react';

class Timer extends Component {

  render() {
  
    return (
      <div className="desktopTimerContainer">
        <progress value="0" max="30" id="progressBar"></progress>
        <span id="countTimer">30</span>
      </div>
    );
  }

}
export default Timer;
