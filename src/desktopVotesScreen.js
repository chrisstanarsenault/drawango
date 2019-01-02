import React, { Component } from "react";
import DesktopVotes from './desktopVotes';
import Canvas from './canvas';
import Timer from './desktopTimerFooter';


class DesktopVotingScreen extends Component {

  render() {  
    
    const guesses = this.props.gameData.guessesDisplayed.map((guess, index) => (
      <DesktopVotes key={index} guess={guess}/>
    ));

    return (
      <div>
        <div id="canvas-votes-container">
          <div id="desktop-mock-canvas-container">
            <p>I am Canvas Container!</p>
          </div>
          <div id="desktop-votes-container">
            {guesses}
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
