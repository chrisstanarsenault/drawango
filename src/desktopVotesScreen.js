import React, { Component } from "react";
import DesktopVotes from './desktopVotes';
import Canvas from './canvas';
import Timer from './desktopTimerFooter';


class DesktopVotingScreen extends Component {

  render() {  

    const guesses = Object.values(this.props.gameData.playerGuess).map((guess, index) => (
      <DesktopVotes key={index} guess={guess}/>
    ));

    //how do you make it stick?? maybe assign a place spesifically??
    //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    let shuffledGuesses = guesses
    .map((a) => ({sort: Math.random(), value: a}))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)

    return (
      <div>
        <div id="canvas-votes-container">
          <div id="desktop-mock-canvas-container">
            <p>I am Canvas Container!</p>
          </div>
          <div id="desktop-votes-container">
            {shuffledGuesses}
          </div>
        </div>
        <div>
          <Timer gameData={this.props.gameData} changeGameStage={this.props.changeGameStage} stage={"scoreStage"} resetTimer={this.props.resetTimer}/>
        </div>
      </div>
    )
  }
}

export default DesktopVotingScreen;
