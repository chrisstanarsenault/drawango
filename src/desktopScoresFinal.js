import React, { Component } from 'react';

class ScoresFinal extends Component {
  render() {
    return (
      <div className="desktop-full-scoresFinal-container">
          <p className="desktop-individual-scoresFinal-player"> {this.props.player} </p>
          <p className="desktop-individual-scoresFinal-points"> {this.props.points} </p>
      </div>
    );
  }
}

export default ScoresFinal;