import React, { Component, Fragment } from 'react';
import './App.css';
import { BrowserView, MobileView } from 'react-device-detect';
import MobileMainView from './mobileMainView';
import DesktopMainView from './desktopMainView';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class App extends Component {
  //below is the logic for the cookies
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
	constructor(props) {
    super(props);
    const { cookies } = props;
		this.state = {
			gameStage: 'welcomeStage',
			mainPlayer: cookies.get('name') || '',
      players:[
        {
					name: "",
					points: 0
        }
      ],
			currentPlayer: '',      
    };
    console.log("this is user's name",this.state.mainPlayer)
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
    this.socket = new WebSocket('ws://' + hostname + ':' + 3001);
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
    const { cookies } = this.props;
    cookies.set('name', name, { path: '/' });
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

export default withCookies(App);
