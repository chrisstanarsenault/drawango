const SocketServer = require('ws').Server;
const express = require('express');
const PORT = 3001;
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));
const wss = new SocketServer({
  server
});

const game = {
  gameStage: "welcomeStage",
  players: ["Valeria", "Sylvain", "Chris", "Alisa"],
  currentPlayer: "Valeria",
  turns: ["Valeria"],
  playerGuess: {}
}

function takeTurns() {
  if (game.players.length === game.turns.length) {
    game.currentPlayer = "gameOver";
  } else {
    const playersWhoHaveNotGone = game.players.filter(function (obj) {
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
    type: "welcomePack",
    players: game.players,
    currentPlayer: game.currentPlayer,
    gameStage: game.gameStage,
    playerGuess: game.playerGuess
  };
  console.log("this is the welcome pack", welcomePack)
  ws.send(JSON.stringify(welcomePack));

  ws.on('message', function (event) {
    let data = JSON.parse(event);
    switch (data.type) {
      case 'setName':
       game.players.push(data.player);
       const players = {
        type: "addPlayer",
        player: data.player
      };
      console.log("adding player",players)
      wss.broadcast(JSON.stringify(players));
       break;
      case 'setGuess':
        const player = data['player'];
        const content = data.content;
        game.playerGuess[player] = content;
        wss.broadcast(event);
        break;
      case "gameStage":
        game.gameStage = data.stage;
        wss.broadcast(event);
        break;
      case 'turns':
        takeTurns();
        const turns = {
          type: "turns",
          currentPlayer: game.currentPlayer
        };
        wss.broadcast(JSON.stringify(turns));
        break;
      default:
			throw new Error("Unknown event type " + data.type)
    }
  })

  ws.on('close', function () {
    console.log('Client disconnected');
  });
});