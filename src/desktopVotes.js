import React, { Component } from "react";
import Canvas from './canvas'

class DesktopVotingScreen extends Component {

  handleEvent = event => {
    this.props.changeGameStage("scoreStage");
  }

  render() {
    return (
      <div>
        <button onClick={this.handleEvent}> Test Next Stage </button>
      </div>
    )
  }
}

export default DesktopVotingScreen;