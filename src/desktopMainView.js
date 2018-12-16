import React, {Component} from 'react';
import DesktopWelcome from './desktopWelcomeScreen'
import Timer from './desktopTimerFooter'
import DesktopDrawingScreen from './desktopDrawingScreen'
import DesktopGuessingScreen from './desktopGuessingScreen'
import DesktopVotingScreen from './desktopVotes'
import DesktopScoresScreen from './desktopScores'

class DesktopMainView extends Component {
  render() {
    if (this.props.stage.gameStage === "welcomeStage") {
      return (
        <div>
          <p>Hello desktop user</p>
          <p>Current stage: {this.props.stage.gameStage} </p>
          <DesktopWelcome changeGameStage={this.props.changeGameStage}/>
          {/* <Timer /> */}
        </div>
      );
    } else if (this.props.stage.gameStage === "drawingStage") {
      return (
        <div>
          <p>Hello Desktop User</p>
          <p>Current stage: {this.props.stage.gameStage} </p>
          <DesktopDrawingScreen changeGameStage={this.props.changeGameStage} />
        </div>
      );
    } else if (this.props.stage.gameStage === "guessingStage") {
      return (
        <div>
          <p>Hello Desktop User</p>
          <p>Current Stage: {this.props.stage.gameStage} </p>
          <DesktopGuessingScreen changeGameStage={this.props.changeGameStage} />
        </div>
      );
    } else if (this.props.stage.gameStage === "votingStage") {
      return (
        <div>
          <p>Hello Desktop User</p>
          <p>Current Stage: {this.props.stage.gameStage} </p>
          <DesktopVotingScreen changeGameStage={this.props.changeGameStage} />
        </div>
      );
    } else if (this.props.stage.gameStage === "scoreStage") {
      return (
        <div>
          <p>Hello Desktop User</p>
          <p>Current Stage: {this.props.stage.gameStage} </p>
          <DesktopScoresScreen changeGameStage={this.props.changeGameStage} />
        </div>
      );
    }
  }
}
export default DesktopMainView;