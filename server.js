// This class helps us to keep track of the clients connected
class Clients {
  constructor() {
    this.clientList = {};
    this.saveClient = this.saveClient.bind(this);
  }
  saveClient(username, client) {
    this.clientList[username] = client;
  }
}

const SocketServer = require('ws').Server;
const express = require('express');
const clients = new Clients();

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
  currentPlayer: "",
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

  const gameStage = {
    type: "gameStage",
    stage: game.gameStage
  };
  ws.send(JSON.stringify(gameStage));

  ws.on('message', function (event) {
    let data = JSON.parse(event);

    switch (data.type) {
      case 'setName':
        clients.saveClient(data.username, ws);
        wss.broadcast(event);
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
    }
  })

  ws.on('close', function () {
    console.log('Client disconnected');
  });
});