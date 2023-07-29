

const headerr = document.getElementById("hedr");
const headerl = document.getElementById("hedl");
const url = new URLSearchParams(window.location.search);
const alert = url.get("alert");

if (alert === "failed") {
  if (!headerr) {
    headerl.style.color = "red";
    headerl.innerHTML = "your email or password is incorrect, please try again";

    setTimeout(() => {
      headerr.style.color = "black";
      headerr.innerHTML = "Register";
    }, 3000);
  } else {
    headerr.style.color = "red";
    headerr.innerHTML = "email already exists, please try again";

    setTimeout(() => {
      headerr.style.color = "black";
      headerr.innerHTML = "Register";
    }, 3000);
  }
}

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
    uname.style.color = "red";

    uname.innerText = username;
  });
