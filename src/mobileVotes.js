import React, {Component} from 'react';

class Votes extends Component {

  handleEvent = (event) => {
    const whoseGuess = event.target.value;
    const mainPlayer = this.props.gameData.mainPlayer;
    const currentPlayer = this.props.gameData.currentPlayer;

    if (whoseGuess === currentPlayer) {
      const points = 100 
      console.log("this is the points",points );
      console.log("this is the pewrson who picked",mainPlayer)
      console.log("this is the pewrson who picked",currentPlayer)
    } else {
      const points = 50 
      console.log("this is the points",points );
      console.log("this is the pewrson who picked",whoseGuess)
    }
    // this.props.changeGameStage("guessingStage");
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