import React, { Component } from "react";
import Scores from './desktopScores';
import Timer from './desktopTimerFooter';


class DesktopFinalScore extends Component {

  render() {


    const playerScores = players.map(player => (
        <Scores key={player} player={player.name} points={player.points} guess={this.props.gameData.playerGuess[player.name]} />
      ));

    return (
      <div>
        <h1>Scoreboard!</h1>
        <h2>{answer}</h2>
        <p>Drawer: {drawer.name} {drawer.points}</p>
        {playerScores}
        <Timer gameData={this.props.gameData} changeGameStage={this.props.changeGameStage} stage={"drawingStage"} resetTimer={this.props.resetTimer}/>
      </div>
    )
  }
}

export default DesktopFinalScore;