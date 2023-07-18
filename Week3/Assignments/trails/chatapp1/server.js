const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const socketServer = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

socketServer.on("connection", (socket) => {
  console.log("bhai aya");

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    socket.broadcast.emit("chat message from server", msg);
   
  });
  

  socket.on("disconnect", () => {
    console.log("bhai gaya");
  });
});

server.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
