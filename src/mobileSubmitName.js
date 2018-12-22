import React, { Component } from 'react';
import MobileDefault from './mobileDefault';

class MobileSubmitName extends Component {

	handleSubmit = (event) => {
		event.preventDefault();
		const nameInput = event.target.elements.name;
		this.props.addPlayerName(nameInput.value);
	};

	render() {

		if (this.props.gameData.mainPlayer){
			return (
				<div>
					<MobileDefault />
				</div>
			);
		}

		return (
			<div id="mobile-name-submit-container">
				<form className="form-container" onSubmit={this.handleSubmit}>
					<label className="mobile-submit-name">
						<p className="mobile-enter-name-title">Enter you name below!</p>
						<input className="mobile-form-name-text" type="text" name="name" />
					</label>
					<input className="mobile-form-name-submit" type="submit" value="Get me in this game!" />
				</form>
			</div>
		);
	}
}

export default MobileSubmitName;
