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
	playerVote: {},
	line: []
};

const draw = 'Cat';

wss.broadcast = function broadcast(data) {
	wss.clients.forEach(function each(ws) {
		ws.send(data);
	});
};

function timer(time) {
	let timeleftCounter = time;
	let downloadTimerCounter = setInterval(function() {
		timeleftCounter--;
		wss.broadcast(JSON.stringify({ type: 'timer', timer: timeleftCounter }));
		if (timeleftCounter <= 0) {
			clearInterval(downloadTimerCounter);
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

wss.on('connection', (ws) => {
	console.log('Client connected');

	const welcomePack = {
		type: 'welcomePack',
		gameStage: game.gameStage,
		players: game.players,
		currentPlayer: game.currentPlayer,
		playerGuess: game.playerGuess,
		playerVote: game.playerVote,
		line: game.line
	};
		ws.send(JSON.stringify(welcomePack));

		ws.on('message', function(event) {
			let data = JSON.parse(event);
		switch (data.type) {
			case 'addPlayer':
				const player = {
					name: data.player,
					points: 0,
					task: draw
				};
				game.players.push(player);
				const players = {
					type: 'updatePlayers',
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
        game.playerGuess[game.currentPlayer.name] = draw;
        const wordToGuess = {
					type: 'addGuess',
					guesses: game.playerGuess
				};
        wss.broadcast(JSON.stringify(turns));
        wss.broadcast(JSON.stringify(wordToGuess));
				break;
			case 'canvas':
				game.line = data.line;
				wss.broadcast(event);
				break;
			case 'setGuess':
				game.playerGuess[data.player] = data.guess;
				wss.broadcast(JSON.stringify(addGuess));
				if (Object.keys(game.playerGuess).length === game.players.length){
					const gameStage = {
						type: "gameStage",
						gameStage: "votingStage"
					}
					wss.broadcast(JSON.stringify(gameStage));
				}
				break;
			case 'gameStage':
				game.gameStage = data.gameStage;
				wss.broadcast(event);
				if (data.gameStage === "drawingStage" || data.gameStage === "guessingStage" || data.gameStage === "votingStage") { 
					timer (31)
				} else if (data.gameStage === "scoreStage") {
					timer(15);
				}
				break;
      case 'addPoints':
        for (let i = 0; i < game.players.length; i++ ){
          if (game.players[i].name === data.player) {
						game.players[i].points += data.points;
					}
				}
				for (let i = 0; i < game.players.length; i++ ){
					if (game.players[i].name === data.mainPlayer){
						game.playerVote[data.mainPlayer] = true;
					}
				}
        const updatePlayers = {
					type: 'updatePlayers',
					players: game.players
				};
				wss.broadcast(JSON.stringify(updatePlayers));
				const updateVotes = {
					type: 'updateVotes',
					playerVote: game.playerVote
				};
				wss.broadcast(JSON.stringify(updateVotes));
				console.log("votes",updateVotes)
				if (Object.keys(game.playerVote).length === game.players.length-1) {
					const gameStage = {
						type: "gameStage",
						gameStage: "scoreStage"
					}
					wss.broadcast(JSON.stringify(gameStage));
				}
				break;
			default:
				throw new Error('Unknown event type ' + data.type);
		}
	});

	ws.on('close', function() {
		console.log('Client disconnected');
	});
});
