import React, {Component} from 'react';
import MobileNavBar from './mobileNavBar';
import MobileGuessingScreen from './mobileGuessingScreen';
import MobileSubmitName from './mobileSubmitName';
import MobileVotes from './mobileVotes';
import Canvas from './canvas';

class MobileMainView extends Component {
  handleTapEventOne = event => {
    event.preventDefault();
    this.props.changeGameStage("guessingStage");
  }

  handleTapEventTwo = event => {
    event.preventDefault();
    this.props.changeGameStage("votingStage");
  }

  render() {
    if (this.props.stage.gameStage === "welcomeStage") {
    return (
      <div>
        <p>Hello Main View for Mobile</p>
        <MobileNavBar/>
        <MobileSubmitName/>
      </div>  
    );
    } else if (this.props.stage.gameStage === "drawingStage"){
      return (
        <div>
          <p>Hello Main View for Mobile</p>
          <p>Current stage {this.props.stage.gameStage} </p>
          <Canvas />
          <button onTouchStart={this.handleTapEventOne}> DONE DRAWING </button>
        </div>  
      );
    } else if (this.props.stage.gameStage === "guessingStage"){
      return (
        <div>
          <p>Hello Main View for Mobile</p>
          <p>Current stage {this.props.stage.gameStage} </p>
          <MobileNavBar/>
          <MobileGuessingScreen/>
          <button onTouchStart={this.handleTapEventTwo}> pick your guess </button>
        </div>  
      );
    } else if (this.props.stage.gameStage === "votingStage"){
      return (
        <div>
          <p>Hello Main View for Mobile</p>
          <p>Current stage {this.props.stage.gameStage} </p>
          <MobileNavBar/>
          <MobileVotes/>
        </div>  
      );
    }
  }
}
export default MobileMainView;