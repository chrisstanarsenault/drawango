import React, { Component } from 'react';

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
				  <p> default page</p>
				</div>
			);
		}

		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>
						Name:
						<input type="text" name="name" />
					</label>
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}
export default MobileSubmitName;
