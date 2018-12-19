const SocketServer = require('ws').Server;
const express = require('express');
const PORT = 3001;
const server = express()
	.use(express.static('public'))
	.listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));
const wss = new SocketServer({
	server
});

const game = {
	gameStage: 'welcomeStage',
	players: [],
	currentPlayer: '',
	turns: [],
	playerGuess: {},
	line: []
};

const draw = 'Cat';

timer = (time, stage) => {
	let timeleftCounter = time;
	let downloadTimerCounter = setInterval(function() {
		timeleftCounter--;
		if (timeleftCounter <= 0) {
			clearInterval(downloadTimerCounter);
			wss.broadcast(JSON.stringify({ type: 'gameStage', stage: stage }));
		}
	}, 1000);
};

function takeTurns() {
	if (game.players.length === game.turns.length) {
		game.currentPlayer = 'gameOver';
	} else {
		const playersWhoHaveNotGone = game.players.filter(function(obj) {
			return game.turns.indexOf(obj) === -1;
		});
		const currentPlayer = playersWhoHaveNotGone[Math.floor(Math.random() * playersWhoHaveNotGone.length)];
		game.turns.push(currentPlayer);
		game.currentPlayer = currentPlayer;
	}
}

wss.broadcast = function broadcast(data) {
	wss.clients.forEach(function each(ws) {
		ws.send(data);
	});
};

wss.on('connection', (ws) => {
	console.log('Client connected');

	const welcomePack = {
		type: 'welcomePack',
		gameStage: game.gameStage,
		players: game.players,
		currentPlayer: game.currentPlayer,
		playerGuess: game.playerGuess,
		line: game.line
	};
	ws.send(JSON.stringify(welcomePack));

	ws.on('message', function(event) {
		let data = JSON.parse(event);
		switch (data.type) {
			case 'setName':
				const addPlayer = {
					name: data.player,
					points: 0,
					task: draw
				};
				game.players.push(addPlayer);
				const players = {
					type: 'addPlayer',
					players: game.players
				};
				wss.broadcast(JSON.stringify(players));
				break;
			case 'turns':
				takeTurns();
				const turns = {
					type: 'turns',
					currentPlayer: game.currentPlayer
				};
				wss.broadcast(JSON.stringify(turns));
				break;
			case 'canvas':
				game.line = data.line;
				wss.broadcast(event);
				break;
			case 'setGuess':
				game.playerGuess[data.player] = data.guess;
				game.playerGuess[game.currentPlayer.name] = draw;
				const guesses = {
					type: 'addGuess',
					guesses: game.playerGuess
				};
				wss.broadcast(JSON.stringify(guesses));
				break;
			case 'gameStage':
				game.gameStage = data.stage;
				wss.broadcast(event);
				if (data.stage === 'drawingStage') {
					timer(30, 'guessingStage');
				}
        break;
      case 'addPoints':
        const updatedPlayers = game.players.map(player => { 
          if (player.name === data.player) {
            player.points += data.points; 
          }
        });
        console.log("this is the ipdated list",updatedPlayers);
        game.players = updatedPlayers;
        const players = {
					type: 'addPlayer',
					players: game.players
				};
				wss.broadcast(JSON.stringify(players));
				break;
			default:
				throw new Error('Unknown event type ' + data.type);
		}
	});

	ws.on('close', function() {
		console.log('Client disconnected');
	});
});
