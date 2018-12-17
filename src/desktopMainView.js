import React, { Component } from 'react';
import DesktopWelcome from './desktopWelcomeScreen';
import Timer from './desktopTimerFooter';
import DesktopDrawingScreen from './desktopDrawingScreen';
import DesktopGuessingScreen from './desktopGuessingScreen';
import DesktopVotingScreen from './desktopVotes';
import DesktopScoresScreen from './desktopScores';
import './desktop.scss'

class DesktopMainView extends Component {
	render() {
		let view;
		switch (this.props.stage.gameStage) {
			case 'welcomeStage':
				view = <DesktopWelcome changeGameStage={this.props.changeGameStage} />;
				break;
			case 'drawingStage':
				view = <DesktopDrawingScreen changeGameStage={this.props.changeGameStage} />;
				break;
			case 'guessingStage':
				view = <DesktopGuessingScreen changeGameStage={this.props.changeGameStage} />;
				break;
			case 'votingStage':
				view = <DesktopVotingScreen changeGameStage={this.props.changeGameStage} />;
				break;
			case 'scoreStage':
				view = <DesktopScoresScreen changeGameStage={this.props.changeGameStage} />;
				break;
		}
		return (
			<div>
				<p>Hello desktop user</p>
				<p>Current stage: {this.props.stage.gameStage} </p>
				{view}
				{/* <Timer /> */}
			</div>
		);
	}
}
export default DesktopMainView;
