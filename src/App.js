import React, { Component, Fragment } from 'react';
import './App.css';
import { BrowserView, MobileView } from 'react-device-detect';
import MobileMainView from './mobileMainView';
import DesktopMainView from './desktopMainView';

class App extends Component {
	constructor() {
		super();
		this.state = {
			gameStage: 'welcomeStage',
			mainPlayer: '',
			players: [
				{
					name: '',
					points: 0
				}
			],
			currentPlayer: '',
			guessChoices: []
		};
		this.changeGameStage = this.changeGameStage.bind(this);
		this.takeTurns = this.takeTurns.bind(this);
		this.socket = undefined;
	}

	//find out what is a static function
	static getHostName() {
		const parser = document.createElement('a');
		parser.href = document.location;
		return parser.hostname;
	}

	componentDidMount() {
		const hostname = App.getHostName();
		const port = 3001;
		this.socket = new WebSocket('ws://' + hostname + ':' + port);
		this.socket.onopen = function(event) {
			console.log('Connected to: ' + event.currentTarget.url);
		};
		this.socket.onmessage = (event) => {
			const message = JSON.parse(event.data);
			if (message.type === 'setName') {
				const previousList = this.state.players;
				const updateList = [ ...previousList, { name: message.username, points: 0 } ];
				this.setState({
					players: updateList
				});
				console.log(this.state.players);
			} else if (message.type === 'gameStage') {
				this.setState({
					gameStage: message.stage
				});
			} else if (message.type === 'turns') {
				this.setState({
					currentPlayer: message.currentPlayer
				});
			}
		};
	}

	takeTurns() {
		//probably won't need this method, kept it here for now for tests
		const test = {
			type: 'turns'
		};
		this.socket.send(JSON.stringify(test));
	}

	changeGameStage(stage) {
		const gameStage = {
			type: 'gameStage',
			stage
		};
		this.socket.send(JSON.stringify(gameStage));
		this.setState({
			gameStage: stage
		});
	}

	addPlayerName = (name) => {
		console.log(name);
		this.setState({
			mainPlayer: name
		});
		const setName = {
			type: 'setName',
			username: name
		};
		this.socket.send(JSON.stringify(setName));
	};

	// addPlayerList = (name) => {
	// 	const previousList = this.state.players;
	// 	const updateList = [ ...previousList, { name: name, points: 0 } ];
	// 	this.setState({
	// 		players: updateList
	// 	});
	// 	console.log(this.state.players);
	// };
	// DID THIS UNDER ASSUMPTION THAT PLAYER HAS ONE GUESS AND
	// THEIR GUESS ARE NOT ASSOCIATED WITH THEIR NAME.. basically the vote is what gets the score? IDK
	addGuess = (guess) => {
		const previousGuess = this.state.guessChoices;
		const updateGuess = [ ...previousGuess, guess ];
		this.setState({
			guessChoices: updateGuess
		});
	};

	render() {
		return (
			<Fragment>
				<h3
					style={{
						textAlign: 'center'
					}}
				>
					Draw Daddy
				</h3>
				<button onClick={this.takeTurns}> take turns </button>
				<BrowserView>
					<DesktopMainView stage={this.state} changeGameStage={this.changeGameStage} />
				</BrowserView>
				<MobileView>
					<MobileMainView
						stage={this.state}
						addPlayerName={this.addPlayerName}
						addGuess={this.addGuess}
						changeGameStage={this.changeGameStage}
					/>
				</MobileView>
			</Fragment>
		);
	}
}

export default App;
