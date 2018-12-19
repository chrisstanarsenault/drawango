import React, {Component} from 'react';

class Score extends Component {

  render() {

    const mainPlayer = this.props.gameData.mainPlayer;
    let points;
    const score = this.props.gameData.players.forEach(function(player)  {
      if (player.name === mainPlayer) {
        points = player.points;
      }
    });

    return (
      <div>
        <h1>Your current score: {points}</h1>
      </div>
    );
  }
}

export default Score;