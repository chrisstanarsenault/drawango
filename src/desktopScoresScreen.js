import React, { Component } from "react";
import Scores from './desktopScores';
import Timer from './desktopTimerFooter';


class DesktopScoresScreen extends Component {

  render() {

    const playerScores = this.props.gameData.players.map(player => (
        <Scores key={player} player={player.name} points={player.points} guess={this.props.gameData.playerGuess[player.name]} />
      ));

    return (
      <div>
        <h1>Scoreboard!</h1>
        <h2>{[this.props.gameData.currentPlayer]} had to draw: {this.props.gameData.playerGuess[this.props.gameData.currentPlayer]}</h2>
        <div id="scores-test-container">{playerScores}</div>
        <Timer gameData={this.props.gameData} changeGameStage={this.props.changeGameStage} stage={"drawingStage"} resetTimer={this.props.resetTimer} takeTurns={this.props.takeTurns}/>
      </div>
    )
  }
}

export default DesktopScoresScreen;