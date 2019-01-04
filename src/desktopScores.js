import React, {Component} from 'react';

class Scores extends Component {
  render() {
    return (
      <div id="desktop-full-scores-container">
        <div className="desktop-score-player-container">
          <p className="desktop-individual-scores-points"> {this.props.points} </p>

          <p className="desktop-individual-scores-player"> {this.props.player} </p>
        </div>
        <div className="desktop-scores-guess-points-container">
          <p className="desktop-individual-scores-guess"> {this.props.guess} </p>
        </div>
      </div>
    );
  }
}

export default Scores;