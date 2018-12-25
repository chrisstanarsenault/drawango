import React, { Component } from 'react';

class MobileSubmitName extends Component {
	constructor() {
    super()
		this.state = { errors: ""}
  }

	handleSubmit = (event) => {
		event.preventDefault();
		const nameInput = event.target.elements.name;
    const name = nameInput.value.replace(/^\s+|\s+$/gm,'').toLowerCase();;
		const playerNames = this.props.gameData.players.map(player => (
      player.name.replace(/^\s+|\s+$/gm,'').toLowerCase()
    ))
		if (!playerNames.includes(name)){
			this.props.addPlayerName(nameInput.value);
    } else {
      this.setState({ errors: "Opps... this name has already been taken" });
    }
	};

	render() {

		if (this.props.gameData.mainPlayer){ 
			return (
				<div>
					<p>default page</p>
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
				<p>{this.state.errors}</p>
			</div>
		);
	}
}

export default MobileSubmitName;
