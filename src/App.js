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
			avatar: cookies.get('avatar') || '',
			players: [],
			currentPlayer: '',
			playerGuess: {},
			playerVote: {},
			line: [],
			timer: null,
			guessesDisplayed: []
		};

		this.changeGameStage = this.changeGameStage.bind(this);
		this.addAvatar = this.addAvatar.bind(this);
		this.resetGame = this.resetGame.bind(this);
		this.takeTurns = this.takeTurns.bind(this);
		this.sendPaintData = this.sendPaintData.bind(this);
		this.addPoints = this.addPoints.bind(this);
		this.resetTimer = this.resetTimer.bind(this);
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
		this.socket = new WebSocket('wss://' + hostname + ':' + port);
		this.socket.onopen = function (event) {
			console.log('Connected to: ' + event.currentTarget.url);
		};
		this.socket.onmessage = (event) => {
			const message = JSON.parse(event.data);
			switch (message.type) {
				case 'welcomePack':
					this.setState({ gameStage: message.gameStage,
													players: message.players,
													currentPlayer: message.currentPlayer.name,
													playerGuess: message.playerGuess,
													playerVote: message.playerVote,
													line: message.line,
													timer: message.timer,
													guessesDisplayed: message.guessesDisplayed
												 });
					break
				case 'updatePlayers':
					this.setState({ players: message.body });
					break;
				case 'updateVotes':
					this.setState({ playerVote: message.body });
					break;
				case 'addGuess':
					this.setState({ playerGuess: message.body});
					break;
				case 'turns':
					this.setState({ currentPlayer: message.body.name,
													line: [],
													gameStage: "drawingStage",
													playerGuess: {},
													playerVote: {},
													guessesDisplayed: []
												});
					console.log("this is the line updated", this.state.line);
					break;
				case 'gameStage':
					this.setState({ gameStage: message.body });
					break;
				case 'canvas':
					this.setState({ line: message.body});
					break;
				case 'timer':
					this.setState({ timer: message.body});
					break;
				case 'guessesDisplayed':
					this.setState({ guessesDisplayed: message.body});
					break;
				default:
					console.log("Unknown event type " + message.type);
			}
		};
	}

	message (type,body){
			return JSON.stringify({ type, body })
	}

	takeTurns() {
		this.socket.send(this.message('turns'));
	}
  resetGame() {
		this.socket.send(this.message('resetGame'));
	}

	changeGameStage = (stage) => {
		this.socket.send(this.message('gameStage', stage));
	}

	addPlayerName = (name) => {
    const { cookies } = this.props;
		cookies.set('name', name, { path: '/' });
		this.setState({ mainPlayer: name });
		this.socket.send(this.message('addPlayer', name));
	};

	addAvatar = (name, avatar) => {
		const { cookies } = this.props;
		cookies.set('avatar', true, { path: '/' });
		const body = {name: name, avatar: avatar}
		this.setState({avatar: avatar});
		this.socket.send(this.message('addAvatar', body));
	};

	addGuess = (guess) => {
		this.socket.send(this.message('addGuess',[this.state.mainPlayer, guess]));
	};

  sendPaintData = (line) => {
		this.socket.send(this.message('canvas', line));
  }

	addPoints(points, player, mainPlayer) {
		this.socket.send(this.message('addPoints', [points, player, mainPlayer]));
	}

	//double check if I need to clear the timer or do it through the backend
	resetTimer(){
		this.setState({ timer: "" });
	}

	render() {
		return (
			<Fragment >
				<BrowserView >
					<DesktopMainView gameData={this.state} changeGameStage={this.changeGameStage} takeTurns={this.takeTurns} resetTimer={this.resetTimer} resetGame={this.resetGame}/>
				</BrowserView>
				<MobileView >
					<MobileMainView gameData={this.state} addPlayerName={this.addPlayerName} addAvatar={this.addAvatar} sendPaintData={this.sendPaintData} addGuess={this.addGuess} changeGameStage={this.changeGameStage} addPoints={this.addPoints}/>
				</MobileView>
			</Fragment>
		);
	}
}

export default withCookies(App);

//things to do:
//something is up with the timer at the drawing stage the second time arround
//and then the score page
//when I choose something is up
//canvas from mobile to descktop doesn't work properly
// create a CSS for opps the name hasn't been taken and someone else have guessed this
// add the default page - maybe the bird
// add the mistake place

