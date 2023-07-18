const socket = io();
const joinForm = document.getElementById("joinForm");
const chatroomDiv = document.getElementById("chatroom");
const privateChatDiv = document.getElementById("privateChat");
const messages = document.getElementById("messages");
const privateMessages = document.getElementById("privateMessages");
const form = document.getElementById("form");
const privateForm = document.getElementById("privateForm");
const input = document.getElementById("input");
const privateInput = document.getElementById("privateInput");
const recipientInput = document.getElementById("recipient");
const typingNowMessage = document.getElementById("typingNow");

let username = "";
let isTyping = false;

function showUserConnectedMessage(username) {
  const userConnectedMessage = document.createElement("li");
  userConnectedMessage.textContent = `${username} has joined the chat`;
  userConnectedMessage.classList.add("userConnectedMessage");
  messages.appendChild(userConnectedMessage);
  setTimeout(() => {
    userConnectedMessage.remove();
  }, 5000);
}

function showUserTypingMessage(username) {
  typingNowMessage.textContent = `${username} is typing...`;
}

function hideUserTypingMessage() {
  typingNowMessage.textContent = "";
}

function sendMessage(msg) {
  socket.emit("chatMessage", msg);
}

function sendPrivateMessage(recipient, message) {
  socket.emit("privateMessage", { recipient, message });
}

function addChatMessage(username, message) {
  const item = document.createElement("li");
  item.textContent = `${username}: ${message}`;
  messages.appendChild(item);
}

function addPrivateMessage(sender, message) {
  const item = document.createElement("li");
  item.textContent = `${sender} (private): ${message}`;
  privateMessages.appendChild(item);
}

joinForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  username = document.getElementById("username").value.trim();
  socket.emit("join", { name, username });

  chatroomDiv.style.display = "block";
  privateChatDiv.style.display = "block";
  joinForm.style.display = "none";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = input.value.trim();
  if (msg) {
    sendMessage(msg);
    input.value = "";
  }
});

privateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const recipient = recipientInput.value.trim();
  const msg = privateInput.value.trim();
  if (recipient && msg) {
    sendPrivateMessage(recipient, msg);
    privateInput.value = "";
  }
});

input.addEventListener("input", () => {
  if (!isTyping) {
    isTyping = true;
    socket.emit("typing");
  }
});

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    isTyping = false;
    socket.emit("stoppedTyping");
    const msg = input.value.trim();
    if (msg) {
      sendMessage(msg);
      input.value = "";
    }
  }
});

socket.on("userConnected", ({ username }) => {
  showUserConnectedMessage(username);
});

socket.on("onlineUsers", (onlineUsers) => {
  console.log("Online Users:", onlineUsers);
});

socket.on("userTyping", (username) => {
  showUserTypingMessage(username);
});

socket.on("userStoppedTyping", () => {
  hideUserTypingMessage();
});

socket.on("chatMessage", ({ username, message }) => {
  addChatMessage(username, message);
});

socket.on("privateMessage", ({ sender, message }) => {
  addPrivateMessage(sender, message,privateMessages = false);
});

socket.on("privateMessageError", ({ recipient, message }) => {
  alert(`${message} Recipient: ${recipient}`);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = input.value.trim();
    if (msg) {
      sendMessage(msg);
      input.value = "";
    }
  });
