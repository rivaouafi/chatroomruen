const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (socket) => {
    socket.on('message', (data) => {
        const message = JSON.parse(data);
        // Handle the message (e.g., broadcast to other clients)
        wss.clients.forEach((client) => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message));
            }
        });
    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
