const SocketServer = require('ws').Server;
const express = require('express');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(ws) {
        ws.send(data);
    });
  };


wss.on('connection', (ws) => {
    
  console.log('Client connected');
  
  ws.on('message', function (event) {
    wss.broadcast(event);  
  })

  ws.on('close', function () {
      console.log('Client disconnected');
  });
});


