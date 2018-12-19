import React, { Component } from 'react';
import DesktopWelcome from './desktopWelcomeScreen';
import Timer from './desktopTimerFooter';
import DesktopDrawingScreen from './desktopDrawingScreen';
import DesktopGuessingScreen from './desktopGuessingScreen';

import DesktopVotingScreen from './desktopVotesScreen';
import DesktopScoresScreen from './desktopScoresScreen';

import './desktop.scss'

class DesktopMainView extends Component {
	render() {
		let view;
		let timer;
		switch (this.props.gameData.gameStage) {
			case 'welcomeStage':
				view = <DesktopWelcome changeGameStage={this.props.changeGameStage} takeTurns={this.props.takeTurns} gameData={this.props.gameData}/>;
				break;
			case 'drawingStage':
				view = <DesktopDrawingScreen changeGameStage={this.props.changeGameStage} gameData={this.props.gameData}/>;
				timer = <Timer />
				break;
			case 'guessingStage':
				view = <DesktopGuessingScreen changeGameStage={this.props.changeGameStage} gameData={this.props.gameData}/>;
				break;
			case 'votingStage':
				view = <DesktopVotingScreen changeGameStage={this.props.changeGameStage} gameData={this.props.gameData}/>;
				break;
			case 'scoreStage':
				view = <DesktopScoresScreen changeGameStage={this.props.changeGameStage} gameData={this.props.gameData}/>;
				break;
		}
		return (
			<div>
				{view}
				{timer}
			</div>
		);
	}
}
export default DesktopMainView;
