import React, { Component } from "react";
import Canvas from './canvas'

class DesktopDrawingScreen extends Component {

  handleEvent = event => {
    this.props.changeGameStage("guessingStage");
  }

  render() {
    return (
      <div>
        <Canvas />
        <button onClick={this.handleEvent}> Test Next Stage </button>
      </div>
    )
  }
}

export default DesktopDrawingScreen;