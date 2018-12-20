import React, {Component} from 'react';

class MobileGuessingScreen extends Component {

  // validateAnswer = answer => {
  //   // trimAnswer = answer.replace(/^\s+|\s+$/g, "");
  //   let check = true;
  //   for (const each in this.props.gameData.playerGuess) {
  //     if (answer === this.props.gameData.playerGuess[each])
  //     console.log(this.props.gameData.playerGuess[each]);
  //     check = false;
  //   }
  //   return check;
  // }

  handleSubmit = event => {
    event.preventDefault();
    const guessInput = event.target.elements.guess;
    const guesses = this.props.gameData.playerGuess;
    let check = true
    for (const each in guesses) {
      console.log(guesses[each])
      if (guessInput.value === guesses[each]) {
      alert('You should try another guess');
      check = false
      }
    }


  //  for (let i=0; i < this.props.gameData.players.length; i++)  {
  //    if (this.props.gameData.playerGuess[this.props.gameData.players[i].name]) {
  //     this.props.gameData.playerGuess[this.props.gameData.players[i]] === guessInput
  //    }
  //  }


    if (check) {
      this.props.addGuess(guessInput.value)
    }
  }

  

  render() {

    let guess = false;

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
        <p>{guess}</p>
       
      </div>
    );
  }
}
export default MobileGuessingScreen;