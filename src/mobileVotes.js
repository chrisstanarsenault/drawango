import React, {Component} from 'react';

class Votes extends Component {

  handleEvent = (event) => {
    const whoseGuess = event.target.value;
    if (whoseGuess === this.props.gameData.currentPlayer) {
      this.props.addPoints(100, this.props.gameData.currentPlayer, this.props.gameData.mainPlayer);
      this.props.addPoints(100, this.props.gameData.mainPlayer, this.props.gameData.mainPlayer);
    } else {
      this.props.addPoints(50, whoseGuess, this.props.gameData.mainPlayer);
    }
  }

  render() {
      return (
        <div className="mobile-individual-votes">
          <span className="mobile-votes-button" onTouchStart={this.handleEvent} value={this.props.player}>{this.props.guess}</span>
        </div>
      );
  }
}

export default Votes;