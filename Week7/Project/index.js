const express = require("express");
const app = express();
const fs = require("fs");
const session = require("express-session");
const multer = require("multer");
const mongoose = require("mongoose");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const socketServer = new Server(server);

const db = require("./model/db");
const UserModel = require("./model/User");
const TicketModel = require("./model/Ticket");
const ChatMessage = require("./model/Chat");

const upload = multer({ dest: "tupload/" });
const chatupload = multer({ dest: "chatupload/" });

chatupload.single("chatimg");

upload.single("ticimg");

// app.use(express.static("public/"));
// app.use(express.static("tupload/"));
// app.use(express.static("chatupload/"));

app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/views/chat.ejs"));

app.use(
  session({
    secret: "somesecret",
    resave: false,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs");

app.get("/", checkAuth, (req, res) => {
  res.render("index.ejs", { username: req.session.username });
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/tupload/:filename", (req, res) => {
  res.sendFile(__dirname + "/tupload/" + req.params.filename);
});

app.get("/chatupload/:filename", (req, res) => {
  res.sendFile(__dirname + "/chatupload/" + req.params.filename);
});

app.post("/login", async (req, res) => {
  const user = await UserModel.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (user) {
    req.session.username = user.username;
    req.session.usertype = user.role;
    if (user.role === "admin") {
      res.redirect("/ticketshome");
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const user = new UserModel({
    username: req.body.username,
    password: req.body.employeePassword,
    email: req.body.employeeEmail,
    role: req.body.usertype,
  });
  await user.save();
  res.redirect("/login");
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

db.init()
  .then(function () {
    console.log("db connected");
    server.listen(3000, () => {
      // app.listen(3000, () => {
      console.log("server started at http://localhost:3000");
    });
  })
  .catch(function (err) {
    console.log("db connection failed");
    console.log(err);
  });

app.post("/submit-ticket", upload.single("ticimg"), async (req, res) => {
  const ticket = new TicketModel({
    id: Date.now(),
    title: req.body.title,
    type: req.body.type,
    desc: req.body.desc,
    pri: req.body.pri,
    status: "Open",
    ticimg: req.file.filename,
    user: req.session.username,
  });
  await ticket.save();

  //res.redirect("/mytickets/:username",{user: req.session.username});
  res.redirect(302, `/mytickets/${req.session.username}`);
});

app.get("/mytickets/:username", async (req, res) => {
  const tickets = await TicketModel.find();
  const user = req.session.username;
  res.render("mytickets.ejs", {
    tickets: tickets,
    user: user,
    username: req.session.username,
  });
});

app.get("/tickettype/:type", async (req, res) => {
  const type = req.params.type;
  const tickets = await TicketModel.find();
  res.render("tickettype.ejs", {
    tickets: tickets,
    username: req.session.username,
    type: type,
  });
});

app.get("/tickets", async (req, res) => {
  const tickets = await TicketModel.find();
  res.render("tickets.ejs", {
    tickets: tickets,
    username: req.session.username,
  });
});

app.get("/ticketshome", async (req, res) => {
  const tickets = await TicketModel.find();
  res.render("ticketshome.ejs", {
    tickets: tickets,
    username: req.session.username,
  });
});

app.get("/ticket/:id", async (req, res) => {
  const id = req.params.id;

  const ticket = await TicketModel.find();
  res.render("ticket.ejs", {
    id: id,
    tickets: ticket,
    username: req.session.username,
  });
});

app.get("/chat/:id", async (req, res) => {
  const id = req.params.id;
  const tickets = await TicketModel.find();

  res.render("chat.ejs", {
    tickets: tickets,
    username: req.session.username,
    id: id,
  });
});

function checkAuth(req, res, next) {
  if (req.session.username) {
    next();
  } else {
    res.redirect("/login");
  }
}

const activeSockets = {};

socketServer.on("connection", (socket) => {
  console.log("connected");
  socket.on("join", (data) => {
    socket.join(data.room);
    activeSockets[data.username] = socket.id;
    console.log(activeSockets);
  });

  socket.on("send-message", (data) => {
    const chat = new ChatMessage({
      id: Date.now(),
      username: data.username,
      message: data.message,
      chatimg: data.chatimg,
      room: data.room,
    });
    chat.save();
    socketServer.to(data.room).emit("message-received", {
      username: data.username,
      message: data.message,
      chatimg: data.chatimg,
    });
  });
});
