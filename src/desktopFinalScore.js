import React, { Component } from "react";
import Scores from './desktopScores';



class DesktopFinalScore extends Component {

  handleEvent = (event) => {
		this.props.changeGameStage('welcomeStage');
	};

  render() {


    const playerScores = this.props.gameData.players.map(player => (
        <Scores key={player} player={player.name} points={player.points}/>
      ));

    return (
      <div>
        <h1>Final Scoreboard!</h1>
        {playerScores}
      </div>
      <div>
      <span id="desktop-play-again">Play again?</span>
          <button onClick={this.handleEvent}> Play again! </button>
      </div>
    )
  }
}

export default DesktopFinalScore;