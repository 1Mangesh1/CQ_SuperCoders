const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));

const users = {};

const getUserList = () => {
  return Object.values(users).map((user) => user.username);
};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (userData) => {
    const { name, username } = userData;
    users[socket.id] = { name, username };
    console.log(`User ${username} with socket ID ${socket.id} joined.`);

    socket.broadcast.emit("message", {
      sender: "Chat App",
      message: `${username} has joined the chat.`,
      type: "system",
    });

    io.emit("userList", getUserList());
  });

  socket.on("chat message", (message) => {
    const { username } = users[socket.id];
    io.emit("message", {
      sender: username,
      message: message,
      type: "other",
    });
  });

  socket.on("disconnect", () => {
    const { username } = users[socket.id];
    delete users[socket.id];
    console.log(`User ${username} with socket ID ${socket.id} disconnected.`);

    io.emit("message", {
      sender: "Chat App",
      message: `${username} has left the chat.`,
      type: "system",
    });

    io.emit("userList", getUserList());
  });
});

app.get("/chat", (req, res) => {
  res.sendFile(__dirname + "/public/chat.html");
});

server.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
