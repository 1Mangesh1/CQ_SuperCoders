


fetch("/username", {
  method: "get",
  headers: {
    "Content-Type": "text/plain",
  },
})
  .then(function (response) {
    if (response.status === 200) {
      return response.text();
    } else {
      alert("Something went wrong");
    }
  })
  .then(function (username) {
    const uname = document.getElementById("username");
  
    uname.innerText = username;
  });
