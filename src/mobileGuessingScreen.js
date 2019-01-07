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
        <form className="mobile-guess-form"onSubmit={this.handleSubmit}>
          <label className="mobile-guess-label">
            <input className="mobile-guess-field" type="text" name="guess" placeholder="Enter your guess here" maxlength="25"/>
          </label>
          <p id="error">{this.state.errors}</p>
          <input className="mobile-guess-button" type="submit" value="Submit your guess" />
        </form>
      </div>
      </div>
    );
  }
}
export default MobileGuessingScreen;