import React, { Component } from "react";
import ScoresFinal from './desktopScoresFinal';



class DesktopFinalScore extends Component {

  handleEvent = (event) => {
		this.props.changeGameStage('welcomeStage');
	};

  render() {


    const playerScoresFinal = this.props.gameData.players.map(player => (
        <ScoresFinal key={player} player={player.name} points={player.points}/>
      ));

    return (
      <div>
        <h1 className='desktop-final-scores-title'>Final Scores!</h1>
        <div className="desktop-full-scoresFinal-name-points-container">
        {playerScoresFinal}
        </div>

        <span className="desktop-final-scores-button-container">
          <button className="desktop-gameover-play-again-button" onClick={this.handleEvent}> Play again! </button>
        </span>
      </div>
    )
  }
}

export default DesktopFinalScore;