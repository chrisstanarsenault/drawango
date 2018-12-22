import React, { Component } from 'react';
import JoinedUsers from './desktopJoinedUsers';

class DesktopWelcome extends Component {
	handleEvent = (event) => {
		this.props.changeGameStage('drawingStage');
		this.props.takeTurns();
	};
	render() {
		const players = this.props.gameData.players.map((player, index) => (
      <JoinedUsers key={index} player={player} index={index}/>
    ));
		return (
      <div>
        <div className="desktopWelcomeContainer">
          <h1 className="desktopWelcomeTitle">Welcome to Drawango</h1>
          <p>Go to this site on your mobile to play: www.whatever-we-want-this-to-be.com</p>
        </div>
        <div id="desktop-players-title-container">
          <span id="desktop-players-title">Who's All Playing!?</span>
          <button onClick={this.handleEvent}> Everyone's in! </button>
        </div>
          <div id="desktop-user-name-container">{players}</div>

      </div>
		);
	}
}

export default DesktopWelcome;

