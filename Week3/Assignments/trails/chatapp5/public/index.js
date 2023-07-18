var form = document.getElementById("form");
var nameInput = document.getElementById("name");
var nicknameInput = document.getElementById("nickname");
var chatroomRadio = document.getElementById("chatroom");
var privateRadio = document.getElementById("private");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = nameInput.value;
  const nickname = nicknameInput.value;
  if (chatroomRadio.checked) {
    window.location.href = `/chatroom.html?name=${name}&nickname=${nickname}`;
  } else if (privateRadio.checked) {
    window.location.href = `/private.html?name=${name}&nickname=${nickname}`;
  }
});
