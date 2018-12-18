import React, { Component } from 'react';

class JoinedUsers extends Component {
	render() {
		return (
			<div>
				<p>{this.props.player.name}</p>
			</div>
		);
	}
}

export default JoinedUsers;