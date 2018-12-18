import React, {Component} from 'react';

class Scores extends Component {
  render() {
    return (
      <div>
        <p> {this.props.player} {this.props.scores}</p>
      </div>
    );
  }
}

export default Scores;