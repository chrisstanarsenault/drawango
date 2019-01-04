import React, { Component } from 'react';
import DesktopWelcome from './desktopWelcomeScreen';
import DesktopDrawingScreen from './desktopDrawingScreen';
import DesktopGuessingScreen from './desktopGuessingScreen';
import DesktopVotingScreen from './desktopVotesScreen';
import DesktopScoresScreen from './desktopScoresScreen';
import DesktopFinalScore from './desktopFinalScore';

import './desktop.scss'

class DesktopMainView extends Component {
	
	pickRelevantComponentToRender (gameStage) {
		
		let view;

		switch (gameStage) {
			case 'welcomeStage':
				view = <DesktopWelcome changeGameStage={this.props.changeGameStage} takeTurns={this.props.takeTurns} gameData={this.props.gameData}/>;
				break;
			case 'drawingStage':
				view = <DesktopDrawingScreen changeGameStage={this.props.changeGameStage} gameData={this.props.gameData} resetTimer={this.props.resetTimer}/>;
				break;
			case 'guessingStage':
				view = <DesktopGuessingScreen changeGameStage={this.props.changeGameStage} gameData={this.props.gameData} resetTimer={this.props.resetTimer}/>;
				break;
			case 'votingStage':
				view = <DesktopVotingScreen changeGameStage={this.props.changeGameStage} gameData={this.props.gameData} resetTimer={this.props.resetTimer}/>;
				break;
			case 'scoreStage':
				view = <DesktopScoresScreen changeGameStage={this.props.changeGameStage} gameData={this.props.gameData} resetTimer={this.props.resetTimer} takeTurns={this.props.takeTurns}/>;
				break;
			case 'finalScore':
				view = <DesktopFinalScore changeGameStage={this.props.changeGameStage} gameData={this.props.gameData} />
				break;
			default:
				view = <p>You shouldn't see this</p>;
		}	
		return view;
	}
	
	render() {
		
		return (
			<div>
				{this.pickRelevantComponentToRender(this.props.gameData.gameStage)}
			</div>
		);
	}
}
export default DesktopMainView;
