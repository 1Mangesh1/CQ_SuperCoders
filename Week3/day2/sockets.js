const express = require('express');
const app = express();
const http = require('http');
const serve = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(serve);

//https://socket.io/get-started/chat


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});


app.get('/cats', (req, res) => {
    res.send('Meow');
});

app.get('/dogs', (req, res) => {
    res.send('Woof');
});

app.get('/cats_and_dogs', (req, res) => {
    res.send('Living together');
});


const server = app.listen(3000, () =>
console.log('Server is running... on http://localhost:3000/')
);




io.on('connection', (socket) => {
    console.log('a user connected');   
socket.on('chat message', (msg) => {

    console.log('message: ' + msg);
    //io.emit('chat message', msg);
    });



    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

