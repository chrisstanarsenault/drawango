import React, {
	Component,
	Fragment
} from 'react';
import './App.css';
import {
	BrowserView,
	MobileView
} from 'react-device-detect';
import MobileMainView from './mobileMainView';
import DesktopMainView from './desktopMainView';

class App extends Component {
	constructor() {
		super();
		this.state = {
			gameStage: 'welcomeStage',
			mainPlayer: '',
			players: [],
			currentPlayer: '',
			playerGuess: {}
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
		this.socket.onopen = function (event) {
			console.log('Connected to: ' + event.currentTarget.url);
		};
		this.socket.onmessage = (event) => {
			const message = JSON.parse(event.data);
			switch (message.type) {
				case 'setName':
					const previousList = this.state.players;
					const updateList = [...previousList, {
						name: message.username,
						points: 0
					}];
					this.setState({
						players: updateList
					});
					console.log(this.state.players);
					break;
				case 'gameStage':
					this.setState({
						gameStage: message.stage
					});
					break;
				case 'turns':
					this.setState({
						currentPlayer: message.currentPlayer
					});
					break;
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


	addGuess = (guess) => {
    console.log(guess);
    const player = this.state.mainPlayer
		this.setState({
			playerGuess: {
        player: guess
      }
		});
    const setGuess = {
      type: 'setGuess',
      player: this.state.mainPlayer,
      content: guess
    };
    console.log(setGuess);
    this.socket.send(JSON.stringify(setGuess));
	};

//guess {mainplayer:this.state.mainPlayer, type: setGuess, content: "guess"}

	render() {
		return ( <
			Fragment >
			<
			h3 style = {
				{
					textAlign: 'center'
				}
			} >
			Draw Daddy <
			/h3> <
			button onClick = {
				this.takeTurns
			} > take turns < /button> <
			BrowserView >
			<
			DesktopMainView stage = {
				this.state
			}
			changeGameStage = {
				this.changeGameStage
			}
			players = {
				this.state.players
			}
			/> <
			/BrowserView> <
			MobileView >
			<
			MobileMainView stage = {
				this.state
			}
			addPlayerName = {
				this.addPlayerName
			}
			addGuess = {
				this.addGuess
			}
			changeGameStage = {
				this.changeGameStage
			}
			/> <
			/MobileView> <
			/Fragment>
		);
	}
}

export default App;