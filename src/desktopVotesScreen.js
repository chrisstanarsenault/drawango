import React, { Component } from "react";
import DesktopVotes from './desktopVotes';
import Canvas from './canvas'

class DesktopVotingScreen extends Component {

  handleEvent = event => {
    this.props.changeGameStage("scoreStage");
  }

  render() {

    //instead of having all this code below, maybe ensure that all players have choice?
    const players = [];
    this.props.gameData.players.forEach(player => {
      if (this.props.gameData.playerGuess[player.name]) {
        players.push(player);
      }
    });

    const guesses = players.map(player => (
      <DesktopVotes key={player.name} guess={this.props.gameData.playerGuess[player.name]}/>
      ));

    return (
      <div>
        <button onClick={this.handleEvent}> Test Next Stage </button>
        <div id="canvas-votes-container">
          <div id="desktop-mock-canvas-container">
            <p>I am Canvas Container!</p>
          </div>
          <div id="desktop-votes-container">
          {guesses}
          </div>
        </div>
        {/* <Canvas gameData={this.props.gameData} /> */}
      </div>
    )
  }
}

export default DesktopVotingScreen;
