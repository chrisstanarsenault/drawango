import React, { Component } from "react";
import Canvas from './canvas'

class DesktopGuessingScreen extends Component {

  handleEvent = event => {
    this.props.changeGameStage("votingStage");
  }

  render() {
    return (
      <div>
        <p> What do you think this is? Submit your guesses </p>
        <Canvas gameData={this.props.gameData} />
        <button onClick={this.handleEvent}> Test Next Stage - this will be removed </button>
      </div>
    )
  }
}

export default DesktopGuessingScreen;