import React, { Component } from 'react';
import Canvas from './canvas';
import Timer from './desktopTimerFooter';

class DesktopDrawingScreen extends Component {
	render() {
		return (
			<div>
				<h1>{this.props.gameData.currentPlayer} is drawing</h1>
        <div id="desktop-canvas-container">
				  <Canvas gameData={this.props.gameData}/>
        </div>
				<Timer gameData={this.props.gameData} changeGameStage={this.props.changeGameStage} stage={"guessingStage"} resetTimer={this.props.resetTimer}/>
			</div>
		);
	}
}

export default DesktopDrawingScreen;
