import React, { Component } from 'react';

class JoinedUsers extends Component {
	render() {
		return (
			<div>
					<p id="users-joined-title">Users Joined:</p>
				<div id="user-container">
					{this.props.players ? this.props.players.map((player) => <div id="each-user">{player.name}</div>) : 'none yet'}
				</div>
			</div>
		);
	}
}

export default JoinedUsers;
