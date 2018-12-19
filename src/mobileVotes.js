import React, {Component} from 'react';

class Votes extends Component {

  handleEvent = (event) => {
    const whoseGuess = event.target.value;
    const currentPlayer = this.props.gameData.currentPlayer;

    if (whoseGuess === currentPlayer) {
      this.props.addPoints(100, currentPlayer);
      this.props.addPoints(100, whoseGuess);
    } else {
      this.props.addPoints(50, whoseGuess);
    }
  }


  render() {
    return (
      <div>
        <button onTouchStart={this.handleEvent} value={this.props.player}>{this.props.guess}</button>
      </div>
    );
  }
}

export default Votes;