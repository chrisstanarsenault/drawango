import React, { Component } from "react";
import Canvas from './canvas';
import Scores from './desktopScores';
import Timer from './desktopTimerFooter';


class DesktopScoresScreen extends Component {

  render() {

    const answer = this.props.gameData.playerGuess[this.props.gameData.currentPlayer];

    const players = [];
    let drawer;
    //see if there is a find and pop function 
    this.props.gameData.players.forEach(player => {
      if (this.props.gameData.currentPlayer === player.name) {
        drawer = player;
      } else {
        players.push(player);
      }
    });

    const playerScores = players.map(player => (
        <Scores key={player} player={player.name} points={player.points} guess={this.props.gameData.playerGuess[player.name]} />
      ));

    return (
      <div>
        <h1>Scoreboard!</h1>
        <h2>{answer}</h2>
        <p>Drawer: {drawer.name} {drawer.points}</p>
        {playerScores}
        <Timer gameData={this.props.gameData} changeGameStage={this.props.changeGameStage} stage={"drawingStage"} resetTimer={this.props.resetTimer} takeTurns={this.props.takeTurns}/>
      </div>
    )
  }
}

export default DesktopScoresScreen;