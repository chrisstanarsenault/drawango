import React, { Component } from "react";
import Canvas from './canvas'
import Scores from './desktopScores'

class DesktopScoresScreen extends Component {

  render() {
    const scores = this.props.gameData.players.map(player => (
      <Scores key={player} player={player.name} scores={player.points}/>
      ));

    return (
      <div>
        <p>This is the last stage</p>
        {scores}
      </div>
    )
  }
}

export default DesktopScoresScreen;