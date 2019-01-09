import React, { Component } from 'react';

class ScoresFinal extends Component {
  render() {
    return (
      <div className="desktop-individual-scoresFinal-player">
          <h1> {this.props.player} </h1>
          <p> Points: {this.props.points} </p>
      </div>
    );
  }
}

export default ScoresFinal;