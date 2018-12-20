import React, { Component } from "react";
import Canvas from './canvas'
import Scores from './desktopScores'

class DesktopScoresScreen extends Component {

  render() {

    const answer = this.props.gameData.playerGuess[this.props.gameData.currentPlayer];

    const players = [];
    let drawer;
    this.props.gameData.players.forEach(player => {
      if (this.props.gameData.currentPlayer === player.name) {
        drawer = player;
      } else {
        players.push(player);
      }
    });

    const playerScores = players.map(player => (
        <Scores key={player} player={player.name} playerScores={player.points} guess={this.props.gameData.playerGuess[player.name]} />
      ));

    return (
      <div>
        <h1>Scoreboard!</h1>
        <h2>{answer}</h2>
        <p>Drawer: {drawer.name} {drawer.points}</p>
        {playerScores}
      </div>
    )
  }
}

export default DesktopScoresScreen;