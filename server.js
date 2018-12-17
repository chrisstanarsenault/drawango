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

const game = {
  gameStage: "welcomeStage",
  players: ["Valeria", "Sylvain", "Chris", "Alisa"],
  currentPlayer: "",
  turns: ["Valeria"]
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
  ws.on('message', (msg) => {
    const parsedMsg = Json.parse(msg);

  });

  const gameStage = {
    type: "gameStage",
    stage: game.gameStage
  };
  ws.send(JSON.stringify(gameStage));

  ws.on('message', function (event) {
    let data = JSON.parse(event);
    if (data.type === 'setupName') {
      clients.saveClient(data.username, client);
      wss.broadcast(event);
    }
    if (data.type === "gameStage") {
      game.gameStage = data.stage;
      wss.broadcast(event);
    } else if (data.type === "turns") {
      takeTurns();
      const turns = {
        type: "turns",
        currentPlayer: game.currentPlayer
      };
      wss.broadcast(JSON.stringify(turns));
    }
  })

  ws.on('close', function () {
    console.log('Client disconnected');
  });
});