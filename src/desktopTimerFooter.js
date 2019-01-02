import React, { Component } from 'react';

class Timer extends Component {

  render() {
    
    if (this.props.gameData.timer === 0) {
      //check if you need the function below to clear the timer
      this.props.resetTimer()
      if (this.props.stage === "drawingStage") {
        this.props.takeTurns();
      } else {
        this.props.changeGameStage(this.props.stage);
      }
      
   
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
