var name = new URLSearchParams(window.location.search).get("name");
var nickname = new URLSearchParams(window.location.search).get("nickname");

document.title = `Chatroom - ${nickname || name}`;

var socket = io();
var form = document.getElementById("form");
var input = document.getElementById("input");
var messages = document.getElementById("messages");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", { username: nickname || name, message: input.value });
    input.value = "";
  }
});

socket.on("chat message from server", function (data) {
  var item = document.createElement("li");
  if (data.username === nickname || data.username === name) {
    item.textContent = `You: ${data.message}`;
    item.classList.add("user-message");
  } else {
    item.textContent = `${data.username}: ${data.message}`;
  }
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});

socket.on("user joined", function (data) {
  var item = document.createElement("li");
  item.textContent = `${data.username} joined the chat`;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});

socket.on("user left", function (data) {
  var item = document.createElement("li");
  item.textContent = `${data.username} left the chat`;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});

socket.on("user typing", function (data) {
  var item = document.getElementById("typing");
  item.textContent = `${data.username} is typing...`;
});

input.addEventListener("input", function () {
  socket.emit("user typing", { username: nickname || name });
});

input.addEventListener("blur", function () {
  var item = document.getElementById("typing");
  item.textContent = "";
});
