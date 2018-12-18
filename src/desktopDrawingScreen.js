import React, { Component } from "react";
import Canvas from './canvas'

class DesktopDrawingScreen extends Component {

  render() {
    return (
      <div>
        <p> {this.props.gameData.currentPlayer} is drawing </p>
<<<<<<< HEAD
        <div id="desktop-canvas-container">
          <Canvas gameData={this.props.gameData} />
        </div>
        <button onClick={this.handleEvent}> Test Next Stage - this needs to be removed later! </button>
=======
        <Canvas gameData={this.props.gameData} />
>>>>>>> master
      </div>
    )
  }
}

export default DesktopDrawingScreen;