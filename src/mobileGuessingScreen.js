import React, {Component} from 'react';
import MobileDefault from './mobileDefault';

class MobileGuessingScreen extends Component {
	constructor() {
    super()
		this.state = { errors: ""}
  }

  handleSubmit = event => {
    event.preventDefault();
    const guessInput = event.target.elements.guess;
    const guess = guessInput.value.replace(/^\s+|\s+$/gm,'').toLowerCase();;
    const guesses = Object.values(this.props.gameData.playerGuess).map(guess => (
      guess.replace(/^\s+|\s+$/gm,'').toLowerCase()
    ))
    if (!guesses.includes(guess)){
      this.props.addGuess(guessInput.value);
    } else {
      this.setState({ errors: "Opps... you came too close" });
    }
  }

  render() {

    if(this.props.gameData.playerGuess[this.props.gameData.mainPlayer]) {
      return (
        <div>
          <MobileDefault />
        </div>
      );
    }

    return (
      <div id="mobile-guess-test">
      <div className="mobile-guessing-screen-container">
        <p>Make your guess!</p>
        <form className="mobile-guess-form"onSubmit={this.handleSubmit}>
          <label className="mobile-guess-label">
            What's the drawing?:
            <div>
            <input className="mobile-guess-field" type="text" name="guess" />
            </div>
          </label>
          <div>
          <input className="mobile-guess-button" type="submit" value="Guess" />
          </div>
        </form>
        <p>{this.state.errors}</p>
      </div>
      </div>
    );
  }
}
export default MobileGuessingScreen;