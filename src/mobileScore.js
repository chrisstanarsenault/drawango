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
      <div className="mobile-score-full-container">
        <div className="mobile-score-container">
          <h1>Your current score: </h1>
          <p>{points}</p>
        </div>
      </div>
    );
  }
}

export default Score;