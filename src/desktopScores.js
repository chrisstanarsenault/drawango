import React, {Component} from 'react';

class Scores extends Component {
  render() {
    return (
      <div id="desktop-scores-container">

        <div className="desktop-score-player-container">
          <p>{this.props.points}</p>
          <img alt="avatar" src={this.props.avatar} />
        </div>

        <div className="desktop-scores-guess-container">
          <p className="desktop-individual-scores-guess"> {this.props.guess} </p>
        </div>

      </div>
    );
  }
}

export default Scores;