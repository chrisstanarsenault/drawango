import React, { Component } from "react";
import DesktopVotes from './desktopVotes';
import Canvas from './canvas';
import Timer from './desktopTimerFooter';


class DesktopVotingScreen extends Component {

  handleEvent = event => {
    this.props.changeGameStage("scoreStage");
  }

  render() {

    //instead of having all this code below, maybe ensure that all players have choice?
    const players = [];
    this.props.gameData.players.forEach(player => {
      if (this.props.gameData.playerGuess[player.name]) {
        players.push(player);
      }
    });

    const guesses = players.map(player => (
      <DesktopVotes key={player.name} guess={this.props.gameData.playerGuess[player.name]}/>
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
