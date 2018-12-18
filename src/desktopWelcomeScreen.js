import React, { Component } from 'react';
import JoinedUsers from './desktopJoinedUsers';

class DesktopWelcome extends Component {
	handleEvent = (event) => {
		this.props.changeGameStage('drawingStage');
	};

	render() {
		return (
      <div>
			<div className="desktopWelcomeContainer">
				<h1 className="desktopWelcomeTitle">Welcome to Draw Daddy</h1>
				<p>Go to this site on your mobile to play: www.whatever-we-want-this-to-be.com</p>
      </div>

      <div id="user-container">
				<JoinedUsers players={this.props.players} />
      </div>

      <div>
				<button onClick={this.handleEvent}> Everyone's in! </button>
			</div>
    </div>
		);
	}
}

export default DesktopWelcome;
