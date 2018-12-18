import React, {Component} from 'react';
import MobileNavBar from './mobileNavBar';
import MobileGuessingScreen from './mobileGuessingScreen';
import MobileSubmitName from './mobileSubmitName';
import MobileVotes from './mobileVotes';
import Canvas from './canvas';
import './mobile.scss'

class MobileMainView extends Component {

  handleEvent = (event) => {
    event.preventDefault();
    this.props.changeGameStage("guessingStage");
  }

  render() {

    let view;

    switch (this.props.gameData.gameStage) {

      case 'welcomeStage':
        view =  <div>
                  <MobileNavBar/>
                  <MobileSubmitName addPlayerName={this.props.addPlayerName} gameData={this.props.gameData}/>
                </div>
        break;

      case 'drawingStage':
        if (this.props.gameData.currentPlayer === this.props.gameData.mainPlayer) {
          view =  <div>
                    <Canvas gameData={this.props.gameData} sendPaintData={this.props.sendPaintData}/>
                    <button onTouchStart={this.handleEvent}> Done Drawing </button>
                  </div>
        } else {
          view =  <div>
                    <MobileNavBar/>
                    <p> This is the default page </p>
                  </div>
        }
        break;

      case 'guessingStage':
        view =  <div>
                  <MobileNavBar/>
                  <MobileGuessingScreen addGuess={this.props.addGuess}/>
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
                </div>
        break;

      default:
        view =  <div>
                  <p>This is the default case. There is a problem if you see this</p>
                </div>
    }

    return (
      <div>
        {view}
      </div>
    );
  
  }
}

export default MobileMainView;