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
    headerr.innerHTML = "email or username already exists, please try again with different email or username";

    setTimeout(() => {
      headerr.style.color = "black";
      headerr.innerHTML = "Register";
    }, 3000);
  }
}
