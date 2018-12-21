import React, { Component } from 'react';
import Canvas from './canvas';
import Timer from './desktopTimerFooter';

class DesktopDrawingScreen extends Component {
	render() {
		return (
			<div>
				<p>{this.props.gameData.currentPlayer} is drawing</p>
				<Canvas gameData={this.props.gameData}/>
				{/* <Timer gameData={this.props.gameData} changeGameStage={this.props.changeGameStage} stage={"guessingStage"} resetTimer={this.props.resetTimer}/> */}
			</div>
		);
	}
}

export default DesktopDrawingScreen;
