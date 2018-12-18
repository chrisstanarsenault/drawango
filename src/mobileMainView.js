import React, {Component} from 'react';
import MobileNavBar from './mobileNavBar';
import MobileGuessingScreen from './mobileGuessingScreen';
import MobileSubmitName from './mobileSubmitName';
import MobileVotes from './mobileVotes';
import Canvas from './canvas';
import './mobile.scss'

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
    let view;
    switch (this.props.stage.gameStage) {
      case 'welcomeStage':
        view =  <div>
                <MobileNavBar/>
                <MobileSubmitName addPlayerName={this.props.addPlayerName} changeGameStage={this.props.changeGameStage} stage={this.props.stage} />
                </div>
        break;
      case 'drawingStage':
        view =  <div>
                <MobileNavBar changeGameStage={this.props.changeGameStage}/>
                <Canvas />
                </div>
        break;
      case 'guessingStage':
        view =  <div>
                <MobileNavBar/>
                <MobileGuessingScreen changeGameStage={this.props.changeGameStage}  addGuess={this.props.addGuess}/>
                <button onTouchStart={this.handleTapEventTwo}> pick your guess </button>
                </div>
        break;
      case 'votingStage':
        view =  <div>
                <MobileNavBar/>
                <MobileVotes/>
                </div>
        break;
      case 'scoreStage':
        view =  <div>
                <MobileNavBar/>
                <h2>Great job! Score: points!</h2>
                </div>
        break;
    }
    return (
      <div>
        {view}
      </div>
    );
  }
}
export default MobileMainView;