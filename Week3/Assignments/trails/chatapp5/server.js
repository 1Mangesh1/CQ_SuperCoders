const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");
const mime = require("mime"); // Add this line

// Set the static directory for serving CSS and other static files
app.use(express.static(path.join(__dirname, "public"), { 
  setHeaders: (res, filePath) => {
    if (mime.getType(filePath) === "text/css") {
      res.setHeader("Content-Type", "text/css");
    }
  }
}));

const users = new Set();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/chatroom.html", (req, res) => {
  res.sendFile(__dirname + "/public/chatroom.html");
});

app.get("/private.html", (req, res) => {
  res.sendFile(__dirname + "/public/private.html");
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
    io.emit("chat message from server", { username: sender, message });
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

  socket.on("private chat message", ({ sender, receiver, message }) => {
    socket.to(getSocketIdByUsername(receiver)).emit("private chat message", { sender, message });
  });

  function getSocketIdByUsername(username) {
    const sockets = io.sockets.sockets;
    for (const socketId in sockets) {
      if (sockets.hasOwnProperty(socketId)) {
        if (sockets[socketId].username === username) {
          return socketId;
        }
      }
    }
    return null;
  }
});


server.listen(3000, () => {
  console.log("server listening on http://localhost:3000");
});
