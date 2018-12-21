import React, { Component } from 'react';

class Timer extends Component {

  render() {
    
    if (this.props.gameData.timer === 0) {
      this.props.resetTimer()
      this.props.changeGameStage(this.props.stage);
      return (<div></div>);  

    } else {

      return (
        <div className="desktopTimerContainer">
          <progress value="0" max="30" id="progressBar"></progress>
          <span id="countTimer">{this.props.gameData.timer}</span>
        </div>
      );    

    }
  }
}

export default Timer;
