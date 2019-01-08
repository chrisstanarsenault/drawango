import React, { Component } from 'react';

class JoinedUsers extends Component {

	render() {
		const avatar = <img alt='avatar' src={this.props.player.avatar} />
		return (
			<div id={`individual-name-container${this.props.index}`}>
			  <span className="desktop-avatar-box">{this.props.player.avatar ? avatar : ''}</span>
				<span className="desktop-name-box">{this.props.player.name} </span>
			</div>
		);
	}
}

export default JoinedUsers;