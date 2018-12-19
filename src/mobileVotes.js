import React, {Component} from 'react';

class Votes extends Component {
  constructor() {
    super();
    this.state = { 
      vote: true
    }
  }

  handleEvent = (event) => {
    const whoseGuess = event.target.value;
    this.setState({ vote: false });
    if (whoseGuess === this.props.gameData.currentPlayer) {
      this.props.addPoints(100, this.props.gameData.currentPlayer);
      this.props.addPoints(100, this.props.gameData.mainPlayer);
    } else {
      this.props.addPoints(50, whoseGuess);
    }
  }


  render() {

    if (this.state.vote) {
      return (
        <div>
          <button onTouchStart={this.handleEvent} value={this.props.player}>{this.props.guess}</button>
        </div>
      );
    }
    return (
      <div>
        <p>Default page</p>
      </div>
    );
  }
}

export default Votes;