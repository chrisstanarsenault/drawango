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