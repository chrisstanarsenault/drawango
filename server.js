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
	line: [],
	timer: null
};

const draw = ['french girls', 'face full of hapinness', 'Putin on a bear', 'Cat'];

wss.broadcast = function broadcast(data) {
	wss.clients.forEach(function each(ws) {
		ws.send(data);
	});
};

function timer(time) {
	clearInterval(game.timer);
	let timeleftCounter = time;
	game.timer = setInterval(function() {
		timeleftCounter--;
		wss.broadcast(JSON.stringify({ type: 'timer', timer: timeleftCounter }));
		if (timeleftCounter <= 0) {
			clearInterval(game.timer);
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
		game.playerGuess[game.currentPlayer.name] = game.currentPlayer.task;
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
		line: game.line,
	};
	console.log("welcome",game.playerGuess)
		ws.send(JSON.stringify(welcomePack));

		ws.on('message', function(event) {
			let data = JSON.parse(event);
		switch (data.type) {
			case 'addPlayer':
			//turn this into a function - game handling object - each key is a function 
				const player = {
					name: data.player,
					points: 0,
					task: draw.shift()
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
					currentPlayer: game.currentPlayer,
				};
				wss.broadcast(JSON.stringify(turns));
				console.log("aother tagert",game.playerGuess)
				const guess = {
					type: 'addGuess',
					playerGuess: game.playerGuess
				};
				console.log("this is here",game.playerGuess)
				wss.broadcast(JSON.stringify(guess));
				break;
			case 'canvas':
				game.line = data.line;
				wss.broadcast(event);
				break;
			case 'addGuess':
				game.playerGuess[data.player] = data.guess;
				const addGuess = {
					type: 'addGuess',
					playerGuess: game.playerGuess
				};
				wss.broadcast(JSON.stringify(addGuess));
				console.log("guesses",Object.keys(game.playerGuess));
					console.log("players",game.players.length);
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
			//refactor below 
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

				// create a message function with a type and data parameters that sends and stringifies the message
				

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