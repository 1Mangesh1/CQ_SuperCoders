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

const upload = multer({ dest: "tupload/" });
const chatupload = multer({ dest: "chatupload/" });

upload.single("chatimg");

upload.single("ticimg");

app.use(express.static("public"));
app.use(express.static("tupload"));
app.use(express.static("chatupload"));

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "somesecret",
    resave: false,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs");

app.get("/", checkAuth , (req, res) => {
  res.render("index.ejs", { username: req.session.username });
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", async (req, res) => {
  const user = await UserModel.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (user) {
    req.session.username = user.username;
    res.redirect("/");
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
    app.listen(3000, () => {
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
    type: req.body.type,
    desc: req.body.desc,
    pri: req.body.pri,
    status: "Open",
    ticimg: req.file.filename,
  });
  await ticket.save();
  res.redirect("/tickets");
});

app.get("/tickets", async (req, res) => {
  const tickets = await TicketModel.find();
  res.render("tickets.ejs", { tickets: tickets });
});

function checkAuth(req, res, next) {
  if (req.session.username) {
    next();
  } else {
    res.redirect("/login");
  }
}
