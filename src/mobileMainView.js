import React, {Component} from 'react';
import MobileNavBar from './mobileNavBar';
import MobileGuessingScreen from './mobileGuessingScreen';
import MobileSubmitName from './mobileSubmitName';
import MobileVotesScreen from './mobileVotesScreen';
import Canvas from './canvas';
import './mobile.scss'

class MobileMainView extends Component {

  handleEvent = (event) => {
    event.preventDefault();
    this.props.changeGameStage("guessingStage");
  }

  render() {

    let view;

    let task;
    this.props.gameData.players.forEach(player => { 
      if (player.name === this.props.gameData.currentPlayer) {
        task = player.task;
      }
    });
 
    switch (this.props.gameData.gameStage) {

      case 'welcomeStage':
        view =  <div>
                  <MobileNavBar/>
                  <MobileSubmitName addPlayerName={this.props.addPlayerName} changeGameStage={this.props.changeGameStage} gameData={this.props.gameData}/>
                </div>
        break;

      case 'drawingStage':
        
        if (this.props.gameData.currentPlayer === this.props.gameData.mainPlayer) {
          view =  <div>
                    <MobileNavBar/>
                    <button onTouchStart={this.handleEvent}> Done Drawing </button>
                    <p>Your turn! Draw a {task}</p>
                    <Canvas gameData={this.props.gameData} sendPaintData={this.props.sendPaintData}/>
                  </div>
        } else {
          view =  <div>
                    <MobileNavBar/>
                    <p> This is the default page </p>
                  </div>
        }
        break;

      case 'guessingStage':
        if (this.props.gameData.currentPlayer === this.props.gameData.mainPlayer) {
          view =  <div>
                    <MobileNavBar/>
                    <p> This is the default page </p>
                  </div>
        } else {
          view =  <div>
                    <MobileNavBar/>
                    <MobileGuessingScreen addGuess={this.props.addGuess}/>
                  </div>
        }
        break;

      case 'votingStage':
        if (this.props.gameData.currentPlayer === this.props.gameData.mainPlayer) {
          view =  <div>
                    <MobileNavBar/>
                    <p> This is the default page </p>
                </div>
        } else {
          view =  <div>
                  <MobileNavBar/>
                  <MobileVotesScreen gameData={this.props.gameData}/>
                  </div>
        }
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