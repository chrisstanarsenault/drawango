import React, {Component} from 'react';
import MobileDefault from './mobileDefault';
import MobileNavBar from './mobileNavBar';
import MobileGuessingScreen from './mobileGuessingScreen';
import MobileSubmitName from './mobileSubmitName';
import MobileVotesScreen from './mobileVotesScreen';
import MobileScore from './mobileScore';
import Canvas from './canvas';
import './mobile.scss'

class MobileMainView extends Component {

  handleEvent = (event) => {
    event.preventDefault();
    this.props.changeGameStage("guessingStage");
  }

  render() {

    let view;

    let drawingAddition;

    let task;
    this.props.gameData.players.forEach(player => {
      if (player.name === this.props.gameData.currentPlayer) {
        task = player.task;
      }
    });

    switch (this.props.gameData.gameStage) {

      case 'welcomeStage':
        view = <MobileSubmitName addPlayerName={this.props.addPlayerName} addAvatar={this.props.addAvatar} changeGameStage={this.props.changeGameStage} gameData={this.props.gameData} />
        break;
      case 'drawingStage':
        if (this.props.gameData.currentPlayer === this.props.gameData.mainPlayer) {
          drawingAddition = <div className="mobile-drawing">
                            <p>Your turn! Draw a {task}</p>
                            <button onTouchStart={this.handleEvent}> Done Drawing </button>
                            </div>
          view =  <div>
                  <Canvas gameData={this.props.gameData} sendPaintData={this.props.sendPaintData}/>
                  </div>
        } else {
          view = <div>
                    {/* <MobileNavBar/> */}
                    <MobileDefault />
                  </div>
        }
        break;
      case 'guessingStage':
        if (this.props.gameData.currentPlayer === this.props.gameData.mainPlayer) {
          view =  <div>
                   {/* <MobileNavBar/> */}
                   <MobileDefault />
                  </div>
        } else {
          view = <MobileGuessingScreen addGuess={this.props.addGuess} gameData={this.props.gameData}/>
        }
        break;
      case 'votingStage':
        if (this.props.gameData.currentPlayer === this.props.gameData.mainPlayer) {
          view =  <div>
                   {/* <MobileNavBar/> */}
                   <MobileDefault />
                </div>
        } else {
          view = <MobileVotesScreen gameData={this.props.gameData} addPoints={this.props.addPoints}/>
        }
        break;
      case 'scoreStage':
        view = <MobileScore gameData={this.props.gameData}/>
        break;
      case 'finalScore':
        view = <div>
                {/* <MobileNavBar/> */}
                <MobileDefault />
               </div>
        break;
      default:
        view = <div>
                <p>This is the default case. There is a problem if you see this</p>
               </div>

    }

    return (
      <div>
        <MobileNavBar />
        {drawingAddition}
        {view}
      </div>
    );

  }
}

export default MobileMainView;
