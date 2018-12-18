import React, { Component } from "react";
import DesktopVotes from './desktopVotes';

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
        {guesses}
      </div>
    )
  }
}

export default DesktopVotingScreen;
