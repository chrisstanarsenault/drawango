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
	timer: null,
	guessesDisplayed: []
};

const draw = ['french girls', 'face full of hapinness', 'Putin on a bear', 'Cat'];

//possibly combine the two functions below:
wss.broadcast = function broadcast(data) {
	wss.clients.forEach(function each(ws) {
		ws.send(data);
	});
};
function message (type,body){
	return JSON.stringify({ type, body })
}

function timer(time) {
	clearInterval(game.timer);
	let timeleftCounter = time;
	game.timer = setInterval(function() {
		timeleftCounter--;
		console.log("this is the timer",timeleftCounter)
		wss.broadcast(message("timer", timeleftCounter));
		if (timeleftCounter <= 0) {
			clearInterval(game.timer);
		}
	}, 1000);
};

const timerConfig = {
	drawingStage: 30,
	guessingStage: 30,
	votingStage: 30,
	scoreStage: 15
}

function takeTurns() {
	if (game.players.length === game.turns.length) {
		game.gameStage = 'finalScore';
		game.currentPlayer = '';
		game.turns = []; //clears the turns to start another game if needed
		wss.broadcast(message("gameStage",game.gameStage));
	} else {
		const playersWhoHaveNotGone = game.players.filter(function(obj) {
			return game.turns.indexOf(obj) === -1;
		});
		const currentPlayer = playersWhoHaveNotGone[Math.floor(Math.random() * playersWhoHaveNotGone.length)];
		game.turns.push(currentPlayer);
		game.currentPlayer = currentPlayer;
		game.playerGuess = {};
		game.playerVote = {};
		game.line = [];
		game.playerGuess[game.currentPlayer.name] = game.currentPlayer.task;
		wss.broadcast(message("turns", game.currentPlayer));
		wss.broadcast(message("addGuess", game.playerGuess));
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
	ws.send(JSON.stringify(welcomePack));

		ws.on('message', function(event) {
			let data = JSON.parse(event);
		switch (data.type) {
			case 'addPlayer':
				const player = {
					name: data.body,
					points: 0,
					task: draw.shift()
				};
				game.players.push(player);
				wss.broadcast(message("updatePlayers", game.players));
				break;
			case 'turns':
				takeTurns();
				break;
			case 'canvas':
				game.line = data.body;
				wss.broadcast(event);
				break;
			case 'addGuess':
				game.playerGuess[data.body[0]] = data.body[1];
				wss.broadcast(message("addGuess", game.playerGuess));
				if (Object.keys(game.playerGuess).length === game.players.length){
					game.gameStage = "votingStage";
					let guesses = Object.values(game.playerGuess);
					//shuffling the guesses;
					//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
					game.guessesDisplayed = guesses
					.map((a) => ({sort: Math.random(), value: a}))
					.sort((a, b) => a.sort - b.sort)
					.map((a) => a.value);
					wss.broadcast(message("gameStage",game.gameStage));
					wss.broadcast(message("guessesDisplayed",game.guessesDisplayed));
				}
				break;
			case 'gameStage':
				game.gameStage = data.body;
				wss.broadcast(event);
				timer(timerConfig[data.body]);
				break;
			case 'addPoints':
        for (let i = 0; i < game.players.length; i++ ){
          if (game.players[i].name === data.body[1]) {
						game.players[i].points += data.body[0];
					}
					if (game.players[i].name === data.body[2]){
						game.playerVote[data.body[2]] = true;
					}
				}
				wss.broadcast(message("updatePlayers", game.players));
				wss.broadcast(message("updateVotes", game.playerVote));

				if (Object.keys(game.playerVote).length === game.players.length-1) {
					game.gameStage = "scoreStage";
					wss.broadcast(message("gameStage",game.gameStage));
				}
				break;
			default:
				console.log('Unknown event type ' + data.type);
		}
	});

	ws.on('close', function() {
		console.log('Client disconnected');
	});
});