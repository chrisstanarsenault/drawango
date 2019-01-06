import React, { Component } from 'react';
import MobileDefault from './mobileDefault';
import SelfieCamera from './mobileSelfie';
import DrawAvatar from './mobileSelfie';
import UploadAvatar from './mobileUpload';

class MobileSubmitName extends Component {
	constructor() {
    super()
		this.state = { errors: "", image: ""}
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
			if (this.props.gameData.avatar) {
			return (
				<div>
					<MobileDefault gameData={this.props.gameData}/>
				</div>
			);
			} else {
				switch(this.state.image) {
					case "selfie":
						return (
							<SelfieCamera gameData={this.props.gameData} addAvatar={this.props.addAvatar}/>
						);
						break;
					case "draw":
						return (
							<DrawAvatar gameData={this.props.gameData} addAvatar={this.props.addAvatar}/>
						);
						break;
					case "upload":
						return (
							<UploadAvatar gameData={this.props.gameData} addAvatar={this.props.addAvatar}/>
						);
						break;
					default:
						return(<div>
							<div><button onClick={ () => {
								this.setState({image: "draw"})
							}}>Draw your face</button>
							</div>
							<div><button onClick={ () => {
								this.setState({image: "selfie"})
							}}>Take a Selfie</button>
							</div>
							<div><button onClick={ () => {
								this.setState({image: "upload"})
							}}>Upload a picture</button>
							</div>
							</div>
						)
				}
				
			}
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
				<p>{this.state.errors}</p>
			</div>
		);
	}
}

export default MobileSubmitName;
