import React, {Component} from 'react';

class Scores extends Component {
  render() {
    return (
      <div className="test-container">
        <p className="desktop-individual-scores-guess"> {this.props.guess} </p>
        <p className="desktop-individual-scores-player"> {this.props.player} </p>
        <p className="desktop-individual-scores-points"> {this.props.points} </p>
      </div>
    );
  }
}

export default Scores;