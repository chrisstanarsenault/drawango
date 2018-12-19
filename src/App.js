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
			playerGuess: {},
			line: [],
		};
		this.changeGameStage = this.changeGameStage.bind(this);
		this.takeTurns = this.takeTurns.bind(this);
		this.sendPaintData = this.sendPaintData.bind(this);
		this.addPoints = this.addPoints.bind(this);
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
					this.setState({ currentPlayer: message.currentPlayer.name });
					this.setState({ playerGuess: message.playerGuess });
					this.setState({ draw: message.draw });
					break
				case 'updatePlayers':
					this.setState({ players: message.players });
					break;
        case 'addGuess':
          this.setState({ playerGuess: message.guesses});
          break;
				case 'gameStage':
					this.setState({ gameStage: message.stage });
					break;
				case 'turns':
					this.setState({ currentPlayer: message.currentPlayer.name});
					this.setState({ line: [] })
					this.setState({ playerGuess: {} })
					break;
				case 'canvas':
					this.setState({ line: message.line});
					break;
				default:
					console.log("Unknown event type " + message.type)
			}
		};
	}

	takeTurns() {
		const takeTurns = { type: 'turns'};
		this.socket.send(JSON.stringify(takeTurns));
	}

	changeGameStage = (stage) => {
		const gameStage = {
			type: 'gameStage',
			stage
		};
		this.socket.send(JSON.stringify(gameStage));
		this.setState({ gameStage: stage });
	}

	addPlayerName = (name) => {
    const { cookies } = this.props;
		cookies.set('name', name, { path: '/' });
		this.setState({ mainPlayer: name });
		const setName = {
			type: 'setName',
			player: name
		};
		this.socket.send(JSON.stringify(setName));
	};

	addGuess = (guess) => {
    const setGuess = {
      type: 'setGuess',
      player: this.state.mainPlayer,
      guess
    };
    this.socket.send(JSON.stringify(setGuess));
	};

  sendPaintData = (line) => {
    const body = {
      type: "canvas",
      line: line,
    };
    this.socket.send(JSON.stringify(body));
  }

	addPoints(points, player) {
		const addPoints = {
      type: 'addPoints',
      player,
      points
		};
		this.socket.send(JSON.stringify(addPoints));
	}

	render() {
		return (
			<Fragment >
				<BrowserView >
					<DesktopMainView gameData={this.state} changeGameStage={this.changeGameStage} takeTurns={this.takeTurns}/>
				</BrowserView>
				<MobileView >
					<MobileMainView gameData={this.state} addPlayerName={this.addPlayerName} sendPaintData={this.sendPaintData} addGuess={this.addGuess} changeGameStage={this.changeGameStage} addPoints={this.addPoints}/>
				</MobileView>
			</Fragment>
		);
	}
}

export default withCookies(App);

// when everone is in seitch the stage
// and when everyones votes next stage 
// can't put the same guess into the system
// RANDOMIZE THE GUESSES