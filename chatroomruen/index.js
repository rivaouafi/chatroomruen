const express = require('express');
const { createServer } = require('node:http');

const app = express();
const server = createServer(app);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
  });

  // this will emit the event to all connected sockets
io.emit('hello', 'world');
io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
  });
  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });
  socket.emit('hello', 'world');
  io.on('connection', (socket) => {
    socket.on('hello', (arg) => {
      console.log(arg); // 'world'
    });
  });
  socket.emit('hello', 1, '2', { 3: '4', 5: Uint8Array.from([6]) });
  io.on('connection', (socket) => {
    socket.on('hello', (arg1, arg2, arg3) => {
      console.log(arg1); // 1
      console.log(arg2); // '2'
      console.log(arg3); // { 3: '4', 5: <Buffer 06> }
    });
  });
  socket.timeout(5000).emit('request', { foo: 'bar' }, 'baz', (err, response) => {
    if (err) {
      // the server did not acknowledge the event in the given delay
    } else {
      console.log(response.status); // 'ok'
    }
  });
  io.on('connection', (socket) => {
    socket.on('request', (arg1, arg2, callback) => {
      console.log(arg1); // { foo: 'bar' }
      console.log(arg2); // 'baz'
      callback({
        status: 'ok'
      });
    });
  });
  try {
    const response = await socket.timeout(5000).emitWithAck('request', { foo: 'bar' }, 'baz');
    console.log(response.status); // 'ok'
  } catch (e) {
    // the server did not acknowledge the event in the given delay
  }

  io.on('connection', (socket) => {
    socket.on('request', (arg1, arg2, callback) => {
      console.log(arg1); // { foo: 'bar' }
      console.log(arg2); // 'baz'
      callback({
        status: 'ok'
      });
    });
  });

  socket.emit('hello', 1, '2', { 3: '4', 5: Uint8Array.from([6]) });
  socket.onAny((eventName, ...args) => {
    console.log(eventName); // 'hello'
    console.log(args); // [ 1, '2', { 3: '4', 5: ArrayBuffer (1) [ 6 ] } ]
  });
  socket.onAnyOutgoing((eventName, ...args) => {
    console.log(eventName); // 'hello'
    console.log(args); // [ 1, '2', { 3: '4', 5: ArrayBuffer (1) [ 6 ] } ]
  });

  io.on('connection', (socket) => {
    // join the room named 'some room'
    socket.join('some room');

    // broadcast to all connected clients in the room
    io.to('some room').emit('hello', 'world');

    // broadcast to all connected clients except those in the room
    io.except('some room').emit('hello', 'world');

    // leave the room
    socket.leave('some room');
  });

    const io = new Server(server, {
  connectionStateRecovery: {}
});
