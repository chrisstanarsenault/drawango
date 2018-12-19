import React, { Component } from "react";
import Canvas from './canvas'

class DesktopDrawingScreen extends Component {

  render() {
    return (
      <div>
        <p> {this.props.gameData.currentPlayer} is drawing </p>
        <Canvas gameData={this.props.gameData} />
      </div>
    )
  }
}

export default DesktopDrawingScreen;