import React, { Component } from "react";
import Scores from './desktopScores';



class DesktopFinalScore extends Component {

  render() {


    const playerScores = this.props.players.map(player => (
        <Scores key={player} player={player.name} points={player.points}/>
      ));

    return (
      <div>
        <h1>Final Scoreboard!</h1>
        {playerScores}
      </div>
      // A PLAY AGAIN BUTTON CAN GO HERE
    )
  }
}

export default DesktopFinalScore;