import React, {Component} from 'react';

class MobileGuessingScreen extends Component {

  handleSubmit = event => {
    event.preventDefault();
    const guessInput = event.target.elements.guess;
    const guess = guessInput.value.replace(/^\s+|\s+$/gm,'').toLowerCase();;
    const guesses = Object.values(this.props.gameData.playerGuess).map(guess => (
      guess.replace(/^\s+|\s+$/gm,'').toLowerCase()
    ))
    if (!guesses.includes(guess)){
      this.props.addGuess(guessInput.value);
      console.log("guesses",guesses);
      console.log("guesses",guess);
      console.log("state",this.props.gameData.playerGuess)
      console.log("another state",Object.values(this.props.gameData.playerGuess))

    }
    }

  render() {

    if(this.props.gameData.playerGuess[this.props.gameData.mainPlayer]) {
      return (
        <div>
          <p>Default page</p>
        </div>
      );
    }

    return (
      <div>
        <p>Make your guess!</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            What's the drawing?:
            <input type="text" name="guess" />
          </label>
          <input type="submit" value="Guess" />
        </form>
      </div>
    );
  }
}
export default MobileGuessingScreen;