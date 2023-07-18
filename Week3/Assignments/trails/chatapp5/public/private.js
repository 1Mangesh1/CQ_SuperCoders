var name = new URLSearchParams(window.location.search).get("name");
var nickname = new URLSearchParams(window.location.search).get("nickname");

document.title = `Private Chat - ${nickname || name}`;

var socket = io();
var privateForm = document.getElementById("privateForm");
var privateInput = document.getElementById("privateInput");
var privateMessages = document.getElementById("privateMessages");

privateForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (privateInput.value) {
    socket.emit("private chat message", { sender: nickname || name, receiver: selectedUser, message: privateInput.value });
    appendPrivateMessage(`You: ${privateInput.value}`, "user-message");
    privateInput.value = "";
  }
});

socket.on("user joined", function (data) {
  appendPrivateMessage(`${data.username} joined the chat`);
  updateUserList(data.username);
});

socket.on("user left", function (data) {
  appendPrivateMessage(`${data.username} left the chat`);
  removeUserFromList(data.username);
});

socket.on("user list", function (users) {
  updateOnlineUsers(users);
});

socket.on("user typing", function (data) {
  var item = document.getElementById("typing");
  item.textContent = `${data.username} is typing...`;
});

socket.on("private chat message", function (data) {
  if (data.sender === nickname || data.sender === name) {
    appendPrivateMessage(`You: ${data.message}`, "user-message");
  } else {
    appendPrivateMessage(`${data.sender}: ${data.message}`);
  }
});

function appendPrivateMessage(message, className) {
  var item = document.createElement("li");
  item.textContent = message;
  if (className) {
    item.classList.add(className);
  }
  privateMessages.appendChild(item);
  privateMessages.scrollTop = privateMessages.scrollHeight;
}

function updateUserList(username) {
  var userList = document.getElementById("userList");
  var userItem = document.createElement("li");
  userItem.textContent = username;
  userItem.setAttribute("data-user", username);
  userItem.addEventListener("click", function () {
    startPrivateChat(username);
  });
  userList.appendChild(userItem);
}

function removeUserFromList(username) {
  var userList = document.getElementById("userList");
  var userItem = userList.querySelector(`li[data-user="${username}"]`);
  if (userItem) {
    userList.removeChild(userItem);
  }
}

function updateOnlineUsers(users) {
  var userList = document.getElementById("userList");
  userList.innerHTML = "";
  users.forEach(function (user) {
    if (user !== (nickname || name)) {
      updateUserList(user);
    }
  });
}

function startPrivateChat(user) {
  selectedUser = user;
  document.title = `Private Chat - ${nickname || name} with ${selectedUser}`;
  privateMessages.innerHTML = "";
}

var selectedUser;
