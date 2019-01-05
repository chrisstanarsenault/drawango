import React, { Component } from 'react';

class JoinedUsers extends Component {
	render() {
		return (
			<div id={`individual-name-container${this.props.index}`}>
			  <span><img alt='avatar' src={this.props.player.avatar} /></span>
				<span>{this.props.player.name} </span>
			</div>
		);
	}
}

export default JoinedUsers;