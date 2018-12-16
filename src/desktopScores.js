import React, { Component } from "react";
import Canvas from './canvas'

class DesktopScoresScreen extends Component {

  handleEvent = event => {
    this.props.changeGameStage("scoreStage");
  }

  render() {
    return (
      <div>
        <p>This is the last stage</p>
        {/* <button onClick={this.handleEvent}> Test Next Stage </button> */}
      </div>
    )
  }
}

export default DesktopScoresScreen;