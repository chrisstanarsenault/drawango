import React, { Component } from "react";
import Canvas from './canvas'
import Timer from './desktopTimerFooter';

class DesktopGuessingScreen extends Component {

  render() {
    return (
      <div>
        <h1> What do you think this is? Submit your guess</h1>
          <div id="desktop-canvas-container">
            <Canvas gameData={this.props.gameData} />
          </div>
        <Timer gameData={this.props.gameData} changeGameStage={this.props.changeGameStage} resetTimer={this.props.resetTimer} stage={"votingStage"}/>
      </div>
    )
  }
}

export default DesktopGuessingScreen;