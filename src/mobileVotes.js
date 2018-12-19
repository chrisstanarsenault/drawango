import React, {Component} from 'react';

class Votes extends Component {

  handleEvent = (event) => {
    const guess = event.target.value;
    const mainPlayer = this.props.gameData.mainPlayer;
    const currentPlayer = this.props.gameData.currentPlayer;
    const currentPlayerTask = this.props.gameData.playerGuess[currentPlayer];
    
    // this.props.changeGameStage("guessingStage");
  }


  render() {
    return (
      <div>
        <button onTouchStart={this.handleEvent} value={this.props.guess}>{this.props.guess}</button>
      </div>
    );
  }
}

export default Votes;