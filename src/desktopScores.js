import React, {Component} from 'react';

class Scores extends Component {
  render() {
    return (
      <div>
        <p> {this.props.guess} {this.props.player} {this.props.points}</p>
      </div>
    );
  }
}

export default Scores;