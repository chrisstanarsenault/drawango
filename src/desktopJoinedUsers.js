import React, { Component } from 'react';

class JoinedUsers extends Component {
	render() {
		return (
			<div id="individual-name-container">
				<span>{this.props.player.name}</span>
			</div>
		);
	}
}

export default JoinedUsers;