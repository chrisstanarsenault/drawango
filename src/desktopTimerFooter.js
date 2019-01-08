import React, { Component } from 'react';

class Timer extends Component {

  render() {

    if (this.props.gameData.timer === 0) {
      this.props.resetTimer()
      if (this.props.stage === "drawingStage") {
        this.props.takeTurns();
      } else {
        this.props.changeGameStage(this.props.stage);
      }
      return (<div></div>);  
    } else {

      let style = {width: "0%"};
      let progress = 100 - (Math.round(this.props.gameData.timer / 30 * 100));
      if (progress) {
        style = {width: `${progress}%`};
      }

      return (
        <div className="TimerProgressBar">
          <div id="myProgress">
            <div id="myBar" style={style}></div>
          </div>
          <div className="desktopTimerContainer">
            <span id="countTimer">{this.props.gameData.timer}</span>
          </div>
        </div>
      );    
    }
  }
}

export default Timer;
