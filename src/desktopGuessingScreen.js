import React, { Component } from "react";
import Canvas from './canvas'

class DesktopGuessingScreen extends Component {

  handleEvent = event => {
    this.props.changeGameStage("votingStage");
  }

  render() {
    return (
      <div>
        <button onClick={this.handleEvent}> Test Next Stage </button>
      </div>
    )
  }
}

export default DesktopGuessingScreen;