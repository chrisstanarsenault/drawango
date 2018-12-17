import React, { Component } from 'react';

class JoinedUsers extends Component {
	render() {
		return (
			<div>
				<u>
					Users Joined:
					{this.props.players ? this.props.players.map((player) => <li>{player.name}</li>) : 'none yet'}
				</u>
			</div>
		);
	}
}

export default JoinedUsers;
