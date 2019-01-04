import React, { Component } from 'react';

class Timer extends Component {

  render() {

    if (this.props.gameData.timer === 0) {
      //check if you need the function below to clear the timer
      this.props.resetTimer()
      if (this.props.stage === "drawingStage") {
        this.props.takeTurns();
        this.props.changeGameStage(this.props.stage);
      } else {
        this.props.changeGameStage(this.props.stage);
      }
      return (<div></div>);  
    } else {

      let progress = 90 - (Math.round(this.props.gameData.timer / 30 * 90));
      let style;
      if (progress) {
        style = {width: `${progress}%`};
      } else {
        style = {width: `0%`};
      }

      return (
        <div className="desktopTimerContainer">

        <div id="myProgress">
          <div id="myBar" style={style}></div>
        </div>

          <span id="countTimer">{this.props.gameData.timer}</span>
        </div>
          
      );    
    }
  }
}

export default Timer;
