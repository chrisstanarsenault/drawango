const SocketServer = require('ws').Server;
const express = require('express');
const PORT = process.env.PORT || 3001;
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

const draw = ['flying cow', 'face full of hapinness', 'Poutine on a bear', 'dancing chicken', 'Veggie hot-dog', 'sleepy rabbit', 'pineapple pizza', 'a dancing grandma', 'a bored rat'];
const drawTwo = ['flying cow', 'face full of hapinness', 'Poutine on a bear', 'dancing chicken', 'Veggie hot-dog', 'sleepy rabbit', 'pineapple pizza', 'a dancing grandma', 'a bored rat'];
const colors = ['#299617', '#5946B2', '#FA5B3D', '#E936A7', '#9C2542']
//possibly combine the two functions below:
wss.broadcast = function broadcast(data) {
	wss.clients.forEach(function each(ws) {
		ws.send(data);
	});
};
function message (type,body){
	return JSON.stringify({ type, body })
}

function reset () {
	game.playerGuess = {};
	game.playerVote = {};
	game.line = [];
	game.guessesDisplayed = [];
}

function timer(time) {
	clearInterval(game.timer);
	let timeleftCounter = time;
	game.timer = setInterval(function() {
		timeleftCounter--;
		wss.broadcast(message("timer", timeleftCounter));
		if (timeleftCounter <= 0) {
			clearInterval(game.timer);
		}
	}, 1000);
};

const timerConfig = {
	drawingStage: 31,
	guessingStage: 31,
	votingStage: 31,
	scoreStage: 16
}

function takeTurns() {
	if (game.players.length === game.turns.length) {
		game.gameStage = 'finalScore';
		game.currentPlayer = '';
		game.turns = [];
		reset();
		for (let i = 0; i < game.players.length; i++ ){
			game.players[i].points = 0;
			game.players[i].task = drawTwo.shift();
		}
		wss.broadcast(message("gameStage",game.gameStage));
	} else {
		const playersWhoHaveNotGone = game.players.filter(function(obj) {
			return game.turns.indexOf(obj) === -1;
		});
		const currentPlayer = playersWhoHaveNotGone[Math.floor(Math.random() * playersWhoHaveNotGone.length)];
		game.turns.push(currentPlayer);
		game.currentPlayer = currentPlayer;
		reset();
		game.playerGuess[game.currentPlayer.name] = game.currentPlayer.task;
		wss.broadcast(message("turns", game.currentPlayer));
		wss.broadcast(message("addGuess", game.playerGuess));
		game.gameStage = "drawingStage";
		wss.broadcast(message("gameStage",game.gameStage));
		timer(timerConfig["drawingStage"]);

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
		guessesDisplayed: game.guessesDisplayed
	};
	ws.send(JSON.stringify(welcomePack));

		ws.on('message', function(event) {

			let data = JSON.parse(event);

		switch (data.type) {
			case 'addPlayer':
				const player = {
					name: data.body,
					points: 0,
					task: draw.shift(),
					color : colors.shift()
				};
				game.players.push(player);
				wss.broadcast(message("updatePlayers", game.players));
				break;
			case 'addAvatar':
				for (let i = 0; i < game.players.length; i++ ){
					if (game.players[i].name === data.body.name) {
						game.players[i].avatar = data.body.avatar
					}
				}
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
					timer(timerConfig["votingStage"]);
					wss.broadcast(message("gameStage",game.gameStage));
					let guesses = Object.values(game.playerGuess);
					//shuffling the guesses;
					//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
					game.guessesDisplayed = guesses
					.map((a) => ({sort: Math.random(), value: a}))
					.sort((a, b) => a.sort - b.sort)
					.map((a) => a.value);
					wss.broadcast(message("guessesDisplayed",game.guessesDisplayed));
				}
				break;
			case 'gameStage':
				game.gameStage = data.body;
				timer(timerConfig[data.body]);
				wss.broadcast(event);
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
					timer(timerConfig["scoreStage"]);
					wss.broadcast(message("gameStage",game.gameStage));
				}
				break;
			case 'resetGame':
        for (let i = 0; i < game.players.length; i++ ){
						game.players[i].points = 0;
						game.players[i].task = draw.shift();
				 }
				wss.broadcast(message("updatePlayers", game.players));
				break;
			default:
				console.log('Unknown event type ' + data.type);
		}
	});

	ws.on('close', function() {
		console.log('Client disconnected');
	});
});