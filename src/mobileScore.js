import React, {Component} from 'react';

class Score extends Component {

  render() {

    let points;

    this.props.gameData.players.forEach(player => {
      if (player.name === this.props.gameData.mainPlayer) {
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