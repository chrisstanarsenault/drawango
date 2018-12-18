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
			mainPlayer: cookies.get('name') || '',
			players: [],
			currentPlayer: '',
			playerGuess: []
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
        // case 'setGuess':
        //   const previousGuess = this.state.playerGuess;
        //   const player = message.player;
        //   const content = message.content;
        //   const updateGuess = {
        //        player: content
        //   }};
        //   this.setState({
        //       playerGuess: { previousGuess, updateGuess }
        //   });
        //   break;
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
// game.playerGuess[player] = content;
	addGuess = (guess) => {
    const player = this.state.mainPlayer;
    const newGuess = {}
    newGuess[this.state.mainPlayer] = guess;
    const previousGuess = this.state.playerGuess;
    const updateGuess = [...previousGuess, newGuess]
    this.setState({
      playerGuess: updateGuess
    });
    const setGuess = {
      type: 'setGuess',
      player: this.state.mainPlayer,
      content: guess
    };
    this.socket.send(JSON.stringify(setGuess));
	};

	 render() {
    return (
      <Fragment>
       <h3 style = {{textAlign: 'center'}} >Draw Daddy </h3>
        <button onClick = {this.takeTurns} > take turns </button>
        <BrowserView >
           <DesktopMainView stage = {this.state} changeGameStage = {this.changeGameStage} players = {this.state.players}/>
        </BrowserView>
        <MobileView >
           <MobileMainView stage = {this.state} addPlayerName = {this.addPlayerName} addGuess = {this.addGuess} changeGameStage = {this.changeGameStage} playerGuess = {this.state.playerGuess}/>
        </MobileView>
      </Fragment>
    );
  }
}

export default withCookies(App);

