const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const socketServer = new Server(server);

const users = {};

socketServer.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.emit("userConnected", { username: users[socket.id]?.username }); 

  socket.on("join", (userData) => {
    const { name, username } = userData;
    users[socket.id] = { name, username };
    console.log(`User ${username} with socket ID ${socket.id} joined.`);
    socket.broadcast.emit("user connected", username); 
  });

  socket.on("chat message", (msg) => {
    const { username } = users[socket.id];
    console.log(`Message from ${username}: ${msg}`);
    socket.broadcast.emit("chat message from server", {
      username,
      message: msg,
      private: false, // it's a chatroom message
    });
  });

  socket.on("privateMessage", ({ recipient, message }) => {
    const { username } = users[socket.id];
    const recipientSocket = Object.keys(users).find(
      (socketId) => users[socketId].username === recipient
    );

    if (recipientSocket) {
      socket.to(recipientSocket).emit("privateMessage", {
        sender: username,
        message,
        private: true, // it's a private message
      });
    } else {
      socket.emit("privateMessageError", {
        recipient,
        message: "User is not online or doesn't exist.",
      });
    }
  });

  socket.on("typing", (username) => {
    socket.broadcast.emit("typing", username);
  });

  socket.on("disconnect", () => {
    const { username } = users[socket.id];
    delete users[socket.id];
    console.log(`User ${username} with socket ID ${socket.id} disconnected.`);
    socketServer.emit("userDisconnected", { username }); 
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index2.html");
});

server.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
