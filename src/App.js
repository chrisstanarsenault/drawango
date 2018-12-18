import React, { Component, Fragment } from 'react';
import './App.css';
import { BrowserView, MobileView } from 'react-device-detect';
import MobileMainView from './mobileMainView';
import DesktopMainView from './desktopMainView';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class App extends Component {
  //below is to set up cookies
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
	};
	
	constructor(props) {
    super(props);
    const { cookies } = props;
		this.state = {
			gameStage: '',
			mainPlayer: cookies.get('name') || '',
			players: [],
			currentPlayer: '',
			playerGuess: {}
		};
		this.changeGameStage = this.changeGameStage.bind(this);
		this.takeTurns = this.takeTurns.bind(this);
		this.socket = undefined;
	}

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
				case 'welcomePack':
					this.setState({ gameStage: message.gameStage });
					this.setState({ players: message.players });
					this.setState({ currentPlayer: message.currentPlayer });
					this.setState({ playerGuess: message.playerGuess });
					break
				case 'addPlayer':
					const previousList = this.state.players;
					const updateList = [...previousList, { name: message.player, points: 0}];
					this.setState({ players: updateList });
					break;
				case 'gameStage':
					this.setState({ gameStage: message.stage});
					break;
				case 'turns':
					this.setState({
						currentPlayer: message.currentPlayer
					});
					break;
				default:
				throw new Error("Unknown event type " + message.type)
			}
		};
	}

	//potentially we won't need this function
	takeTurns() {
		const test = { type: 'turns'};
		this.socket.send(JSON.stringify(test));
	}

	changeGameStage(stage) {
		const gameStage = {
			type: 'gameStage',
			stage
		};
		this.socket.send(JSON.stringify(gameStage));
		this.setState({ gameStage: stage });
	}

	addPlayerName = (name) => {
		//Set the cookie
    const { cookies } = this.props;
		cookies.set('name', name, { path: '/' });
		//Update the player's name
		this.setState({ mainPlayer: name });
		//Broadcast to the rest of the players that a user has joined the game
		const setName = {
			type: 'setName',
			player: name
		};
		this.socket.send(JSON.stringify(setName));
	};

	addGuess = (guess) => {
		this.setState({
			playerGuess: { player: guess }
		});
    const setGuess = {
      type: 'setGuess',
      player: this.state.mainPlayer,
      content: guess
    };
    this.socket.send(JSON.stringify(setGuess));
	};

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

export default withCookies(App);

