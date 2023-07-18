const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const users = new Set();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", (socket) => {
  let username;

  socket.on("user joined", ({ username: user }) => {
    username = user;
    users.add(username);
    io.emit("user joined", { username });
    io.emit("user list", Array.from(users));
  });

  socket.on("chat message", ({ username: sender, message }) => {
    io.emit("chat message from server", { sender, message });
  });

  socket.on("user typing", ({ username: user }) => {
    socket.broadcast.emit("user typing", { username: user });
  });

  socket.on("disconnect", () => {
    if (username) {
      users.delete(username);
      io.emit("user left", { username });
      io.emit("user list", Array.from(users));
    }
  });

  socket.on("private chat request", ({ sender, receiver }) => {
    socket.to(getSocketIdByUsername(receiver)).emit("private chat request", { sender });
  });

  socket.on("private chat accept", ({ sender, receiver }) => {
    socket.to(getSocketIdByUsername(sender)).emit("private chat accept", { receiver });
  });

  socket.on("private chat message", ({ sender, receiver, message }) => {
    socket.to(getSocketIdByUsername(receiver)).emit("private chat message", { sender, message });
  });

  function getSocketIdByUsername(username) {
    const userSocket = Array.from(io.sockets.sockets).find(([_, socket]) => socket.username === username);
    return userSocket ? userSocket[0] : null;
  }
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
