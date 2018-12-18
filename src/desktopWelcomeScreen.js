import React, { Component } from 'react';
import JoinedUsers from './desktopJoinedUsers';

class DesktopWelcome extends Component {
	handleEvent = (event) => {
		this.props.changeGameStage('drawingStage');
	};

	render() {

		const players = this.props.players.map(player => (
      <JoinedUsers key={player} player={player} />
    ));

		return (
			<div className="desktopWelcomeContainer">
				<h1 className="desktopWelcomeTitle">Welcome to Draw Daddy</h1>
				<p>Go to this site on your mobile to play: www.whatever-we-want-this-to-be.com</p>
				<p>{players}</p>
				<button onClick={this.handleEvent}> Everyone's in! </button>
			</div>
		);
	}
}

export default DesktopWelcome;

